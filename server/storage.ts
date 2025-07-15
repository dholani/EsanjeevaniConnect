import { doctors, departments, users, type User, type InsertUser, type Doctor, type InsertDoctor, type Department, type InsertDepartment } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDoctors(): Promise<Doctor[]>;
  getDoctorsByDepartment(department: string): Promise<Doctor[]>;
  getAvailableDoctors(): Promise<Doctor[]>;
  searchDoctors(query: string): Promise<Doctor[]>;
  getDoctorById(id: number): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  getDepartments(): Promise<Department[]>;
  getDepartmentByName(name: string): Promise<Department | undefined>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  
  getStats(): Promise<{
    availableDoctors: number;
    departments: number;
    patientsServed: string;
    locations: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private doctors: Map<number, Doctor>;
  private departments: Map<number, Department>;
  private currentUserId: number;
  private currentDoctorId: number;
  private currentDepartmentId: number;

  constructor() {
    this.users = new Map();
    this.doctors = new Map();
    this.departments = new Map();
    this.currentUserId = 1;
    this.currentDoctorId = 1;
    this.currentDepartmentId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize departments
    const departmentData: InsertDepartment[] = [
      { name: "General Medicine", description: "General medical consultation and treatment", doctorCount: 0 },
      { name: "Dermatology", description: "Skin, hair, and nail disorders", doctorCount: 0 },
      { name: "Orthopaedics", description: "Bone, joint, and muscle disorders", doctorCount: 0 },
      { name: "ENT-Otolaryngology", description: "Ear, nose, and throat disorders", doctorCount: 0 },
      { name: "Paediatrics", description: "Children's health and development", doctorCount: 0 },
      { name: "Psychiatry", description: "Mental health and behavioral disorders", doctorCount: 0 },
      { name: "Cardiology", description: "Heart and cardiovascular system", doctorCount: 0 },
      { name: "Gynecology", description: "Women's reproductive health", doctorCount: 0 },
    ];

    departmentData.forEach(dept => {
      const department: Department = { 
        ...dept, 
        id: this.currentDepartmentId++,
        description: dept.description || null,
        doctorCount: dept.doctorCount || 0
      };
      this.departments.set(department.id, department);
    });

    // Initialize doctors with real data from eSanjeevani
    const doctorData: InsertDoctor[] = [
      {
        name: "Dr. Suresh Patil",
        qualification: "M.B.B.S, Medical Officer",
        specialization: "General Medicine",
        department: "General Medicine",
        location: "Pune, Maharashtra",
        patientsServed: 63500,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Balaji Rambhau Bhakare",
        qualification: "M.B.B.S, General Physician",
        specialization: "General Medicine",
        department: "General Medicine",
        location: "Hingoli, Maharashtra",
        patientsServed: 104000,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Tresy Jose",
        qualification: "M.D, Dermatology",
        specialization: "Dermatology",
        department: "Dermatology",
        location: "Thiruvananthapuram, Kerala",
        patientsServed: 22200,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1594824375689-d3e2e1c1a8a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Geevan Mathew",
        qualification: "M.S, Orthopaedics",
        specialization: "Orthopaedics",
        department: "Orthopaedics",
        location: "Kottayam, Kerala",
        patientsServed: 7300,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Athira Raj SB",
        qualification: "M.B.B.S, ENT-Otolaryngology",
        specialization: "ENT-Otolaryngology",
        department: "ENT-Otolaryngology",
        location: "Thiruvananthapuram, Kerala",
        patientsServed: 22000,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1594824375689-d3e2e1c1a8a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Vineetha Sudheesh",
        qualification: "M.B.B.S, Paediatrics",
        specialization: "Paediatrics",
        department: "Paediatrics",
        location: "Thiruvananthapuram, Kerala",
        patientsServed: 13000,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Naresh Udgirkar",
        qualification: "M.B.B.S, Medical Officer",
        specialization: "General Medicine",
        department: "General Medicine",
        location: "Pune, Maharashtra",
        patientsServed: 43700,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Jiss Elizabeth Sebastian",
        qualification: "M.D, Dermatology",
        specialization: "Dermatology",
        department: "Dermatology",
        location: "Thiruvananthapuram, Kerala",
        patientsServed: 23900,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1594824375689-d3e2e1c1a8a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Anil Kumar R",
        qualification: "M.S, Orthopaedics",
        specialization: "Orthopaedics",
        department: "Orthopaedics",
        location: "Pathanamthitta, Adoor, Kerala",
        patientsServed: 9500,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Abhishek Bhardwaj",
        qualification: "M.B.B.S, Medical Officer",
        specialization: "General Medicine",
        department: "General Medicine",
        location: "Varanasi, Sadar, Uttar Pradesh",
        patientsServed: 94100,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Sampath kumar R B",
        qualification: "M.B.B.S, Medical Officer",
        specialization: "General Medicine",
        department: "General Medicine",
        location: "Kallakurichi, Sankarapuram, Tamil Nadu",
        patientsServed: 128500,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Dr. Eapen Thomas",
        qualification: "M.D, Dermatology",
        specialization: "Dermatology",
        department: "Dermatology",
        location: "Kottayam, Kerala",
        patientsServed: 6200,
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
      }
    ];

    doctorData.forEach(doc => {
      const doctor: Doctor = { 
        ...doc, 
        id: this.currentDoctorId++,
        isAvailable: doc.isAvailable ?? true,
        imageUrl: doc.imageUrl || null
      };
      this.doctors.set(doctor.id, doctor);
    });

    // Update department doctor counts
    this.updateDepartmentCounts();
  }

  private updateDepartmentCounts() {
    const departmentCounts = new Map<string, number>();
    
    Array.from(this.doctors.values()).forEach(doctor => {
      if (doctor.isAvailable) {
        departmentCounts.set(doctor.department, (departmentCounts.get(doctor.department) || 0) + 1);
      }
    });

    Array.from(this.departments.values()).forEach(dept => {
      dept.doctorCount = departmentCounts.get(dept.name) || 0;
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctorsByDepartment(department: string): Promise<Doctor[]> {
    return Array.from(this.doctors.values()).filter(
      (doctor) => doctor.department === department && doctor.isAvailable,
    );
  }

  async getAvailableDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values()).filter(
      (doctor) => doctor.isAvailable,
    );
  }

  async searchDoctors(query: string): Promise<Doctor[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.doctors.values()).filter(
      (doctor) =>
        doctor.isAvailable &&
        (doctor.name.toLowerCase().includes(lowerQuery) ||
          doctor.specialization.toLowerCase().includes(lowerQuery) ||
          doctor.location.toLowerCase().includes(lowerQuery) ||
          doctor.department.toLowerCase().includes(lowerQuery)),
    );
  }

  async getDoctorById(id: number): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = this.currentDoctorId++;
    const doctor: Doctor = { 
      ...insertDoctor, 
      id,
      isAvailable: insertDoctor.isAvailable ?? true,
      imageUrl: insertDoctor.imageUrl || null
    };
    this.doctors.set(id, doctor);
    this.updateDepartmentCounts();
    return doctor;
  }

  async getDepartments(): Promise<Department[]> {
    this.updateDepartmentCounts();
    return Array.from(this.departments.values());
  }

  async getDepartmentByName(name: string): Promise<Department | undefined> {
    return Array.from(this.departments.values()).find(
      (dept) => dept.name === name,
    );
  }

  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
    const id = this.currentDepartmentId++;
    const department: Department = { 
      ...insertDepartment, 
      id,
      description: insertDepartment.description || null,
      doctorCount: insertDepartment.doctorCount || 0
    };
    this.departments.set(id, department);
    return department;
  }

  async getStats(): Promise<{
    availableDoctors: number;
    departments: number;
    patientsServed: string;
    locations: number;
  }> {
    const availableDoctors = Array.from(this.doctors.values()).filter(
      (doctor) => doctor.isAvailable,
    ).length;

    const departments = this.departments.size;

    const totalPatients = Array.from(this.doctors.values()).reduce(
      (sum, doctor) => sum + doctor.patientsServed,
      0,
    );

    const uniqueLocations = new Set(
      Array.from(this.doctors.values()).map((doctor) => doctor.location),
    ).size;

    return {
      availableDoctors,
      departments,
      patientsServed: totalPatients > 1000000 ? `${(totalPatients / 1000000).toFixed(1)}M+` : `${Math.floor(totalPatients / 1000)}K+`,
      locations: uniqueLocations,
    };
  }
}

export const storage = new MemStorage();
