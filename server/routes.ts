import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all available doctors
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await storage.getAvailableDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors" });
    }
  });

  // Get doctors by department
  app.get("/api/doctors/department/:department", async (req, res) => {
    try {
      const { department } = req.params;
      const doctors = await storage.getDoctorsByDepartment(department);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors by department" });
    }
  });

  // Search doctors
  app.get("/api/doctors/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const doctors = await storage.searchDoctors(q);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to search doctors" });
    }
  });

  // Get doctor by ID
  app.get("/api/doctors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid doctor ID" });
      }
      const doctor = await storage.getDoctorById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctor" });
    }
  });

  // Get all departments
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  });

  // Get statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
