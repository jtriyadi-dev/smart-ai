import {
  FullProjectRecord,
  ProjectTask,
  FullProjectMilestone,
  FullProjectDocument,
  ProjectMeetingItem,
  ProjectUpdateNotice,
  ProjectRiskItem,
  ProjectIssueItem,
  ProjectReleaseItem,
  ProjectActivityLog,
  ProjectChatMessage,
  ProjectUATTestCase,
  ProjectUATApproval,
  ProjectPhaseDetails,
} from '../types';
import { ProjectProgressService } from './ProjectProgressService';
import { ProjectHealthService } from './ProjectHealthService';

const STORAGE_KEY = 'smart_ai_projects_v2';

export class ProjectService {
  private static getStoredProjects(): FullProjectRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse projects from storage:', e);
    }
    const seed = this.generateInitialSeedProjects();
    this.saveProjects(seed);
    return seed;
  }

  private static saveProjects(projects: FullProjectRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to storage:', e);
    }
  }

  public static getAllProjects(): FullProjectRecord[] {
    const projects = this.getStoredProjects();
    return projects.map((p) => this.refreshProjectCalculations(p));
  }

  public static getProjectsByCompany(companyId: string): FullProjectRecord[] {
    const all = this.getAllProjects();
    const filtered = all.filter((p) => p.companyId === companyId);
    return filtered.map((p) => this.filterForCustomer(p));
  }

  public static getProjectById(id: string): FullProjectRecord | undefined {
    const all = this.getAllProjects();
    return all.find((p) => p.id === id);
  }

  public static getCustomerProjectById(id: string, companyId: string): FullProjectRecord | undefined {
    const project = this.getProjectById(id);
    if (!project) return undefined;
    if (project.companyId !== companyId) return undefined;
    return this.filterForCustomer(project);
  }

  public static createProject(data: Partial<FullProjectRecord>): FullProjectRecord {
    const all = this.getStoredProjects();
    const now = new Date().toISOString();
    const id = `prj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const num = `PRJ-2026-${String(all.length + 1).padStart(3, '0')}`;

    const defaultPhases: ProjectPhaseDetails[] = [
      {
        id: `phase_req_${id}`,
        projectId: id,
        name: 'Requirement',
        status: 'IN_PROGRESS',
        progress: 100,
        weight: 10,
        startDate: data.startDate || '2026-08-01',
        dueDate: '2026-08-10',
        completedDate: '2026-08-08',
        sortOrder: 1,
        subItems: [
          { name: 'Business Requirements Document (BRD)', completed: true, category: 'Requirement' },
          { name: 'Functional Specification & Workflows', completed: true, category: 'Requirement' },
          { name: 'AI Integration Requirement Mapping', completed: true, category: 'AI Requirements' },
        ],
      },
      {
        id: `phase_ux_${id}`,
        projectId: id,
        name: 'UI/UX',
        status: 'IN_PROGRESS',
        progress: 100,
        weight: 15,
        startDate: '2026-08-09',
        dueDate: '2026-08-20',
        completedDate: '2026-08-18',
        sortOrder: 2,
        subItems: [
          { name: 'Wireframes & User Journey Diagrams', completed: true },
          { name: 'High-Fidelity Component Library & Design System', completed: true },
          { name: 'Customer UI Review & Approval', completed: true },
        ],
      },
      {
        id: `phase_dev_${id}`,
        projectId: id,
        name: 'Development',
        status: 'IN_PROGRESS',
        progress: 65,
        weight: 45,
        startDate: '2026-08-19',
        dueDate: '2026-09-30',
        sortOrder: 3,
        subItems: [
          { name: 'Frontend Architecture & State Store', completed: true },
          { name: 'Backend Express API & Express Microservices', completed: true },
          { name: 'Database Schema & Multitenant Logic', completed: true },
          { name: 'AI Engine Integration (Gemini SDK)', completed: false },
          { name: 'Payment Gateway & CRM Webhook Sync', completed: false },
        ],
      },
      {
        id: `phase_test_${id}`,
        projectId: id,
        name: 'Testing',
        status: 'NOT_STARTED',
        progress: 0,
        weight: 20,
        startDate: '2026-09-25',
        dueDate: '2026-10-15',
        sortOrder: 4,
        subItems: [
          { name: 'API Security & RBAC Penetration Testing', completed: false },
          { name: 'End-to-End Functional Test Suite', completed: false },
          { name: 'UAT Sign-off Preparation', completed: false },
        ],
      },
      {
        id: `phase_deploy_${id}`,
        projectId: id,
        name: 'Deployment',
        status: 'NOT_STARTED',
        progress: 0,
        weight: 10,
        startDate: '2026-10-10',
        dueDate: data.targetDate || '2026-10-31',
        sortOrder: 5,
        subItems: [
          { name: 'Production Cloud Run Container Build', completed: false },
          { name: 'SSL Certificate & Domain Routing', completed: false },
          { name: 'Handover & Operations Manual Delivery', completed: false },
        ],
      },
    ];

    const newProject: FullProjectRecord = {
      id,
      projectNumber: num,
      companyId: data.companyId || 'comp_global_logistics',
      customerName: data.customerName || 'PT Global Logistics Indonesia',
      projectName: data.projectName || 'Enterprise AI Application',
      description: data.description || 'Custom web application software project.',
      status: data.status || 'DEVELOPMENT',
      health: 'ON_TRACK',
      startDate: data.startDate || '2026-08-01',
      targetDate: data.targetDate || '2026-10-31',
      overallProgress: 0,
      projectManagerId: data.projectManagerId || 'pm_01',
      projectManagerName: data.projectManagerName || 'Ahmad PM (SMART-AI.ID)',
      industry: data.industry || 'Logistics & Supply Chain',
      appType: data.appType || 'Enterprise Web App',
      techStack: data.techStack || ['React 18', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Gemini AI'],
      quotationId: data.quotationId,
      proposalId: data.proposalId,
      requirementAnalysisId: data.requirementAnalysisId,
      phases: defaultPhases,
      milestones: data.milestones || [],
      tasks: data.tasks || [],
      documents: data.documents || [],
      meetings: data.meetings || [],
      updates: data.updates || [],
      risks: data.risks || [],
      issues: data.issues || [],
      releases: data.releases || [],
      uatTestCases: data.uatTestCases || [],
      messages: [],
      activities: [
        {
          id: `act_${Date.now()}`,
          projectId: id,
          userId: 'admin',
          userName: 'System Admin',
          activityType: 'PROJECT_CREATED',
          title: 'Project Initialized',
          description: `Project ${num} created for ${data.customerName || 'Client'}.`,
          visibility: 'CUSTOMER_VISIBLE',
          createdAt: now,
        },
      ],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          projectId: id,
          date: data.startDate || '2026-08-01',
          title: 'Project Kickoff',
          description: 'Initial project setup and scope validation.',
          type: 'PHASE',
          status: 'COMPLETED',
          createdBy: 'PM Team',
          createdAt: now,
        },
      ],
      financialSummary: data.financialSummary || {
        contractValue: 150000000,
        invoiced: 75000000,
        paid: 75000000,
        outstanding: 75000000,
        currency: 'IDR',
      },
      createdAt: now,
      updatedAt: now,
    };

    const recalculated = this.refreshProjectCalculations(newProject);
    all.push(recalculated);
    this.saveProjects(all);
    return recalculated;
  }

  public static updateProject(id: string, updates: Partial<FullProjectRecord>): FullProjectRecord | undefined {
    const all = this.getStoredProjects();
    const index = all.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const existing = all[index];
    const updated: FullProjectRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const recalculated = this.refreshProjectCalculations(updated);
    all[index] = recalculated;
    this.saveProjects(all);
    return recalculated;
  }

  public static addTask(projectId: string, taskData: Partial<ProjectTask>): ProjectTask {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();

    const newTask: ProjectTask = {
      id: taskId,
      projectId,
      milestoneId: taskData.milestoneId,
      phaseName: taskData.phaseName || 'Development',
      name: taskData.name || 'New Task',
      description: taskData.description || '',
      status: taskData.status || 'TODO',
      priority: taskData.priority || 'MEDIUM',
      progress: taskData.status === 'DONE' ? 100 : taskData.status === 'TODO' ? 0 : taskData.progress || 25,
      assigneeId: taskData.assigneeId || 'dev_01',
      assigneeName: taskData.assigneeName || 'Senior Lead Developer',
      assigneeRole: taskData.assigneeRole || 'Developer',
      dueDate: taskData.dueDate || new Date(Date.now() + 864000000).toISOString().split('T')[0],
      weight: taskData.weight || 1,
      visibility: taskData.visibility || 'CUSTOMER_VISIBLE',
      dependsOnTaskId: taskData.dependsOnTaskId,
      labels: taskData.labels || ['Feature'],
      createdAt: now,
      updatedAt: now,
    };

    // Evaluate dependency
    if (newTask.dependsOnTaskId) {
      const parentTask = project.tasks.find((t) => t.id === newTask.dependsOnTaskId);
      if (parentTask && parentTask.status !== 'DONE') {
        newTask.status = 'BLOCKED';
      }
    }

    project.tasks.push(newTask);
    project.activities.unshift({
      id: `act_${Date.now()}`,
      projectId,
      userId: taskData.assigneeId || 'pm',
      userName: 'Project Manager',
      activityType: 'TASK_CREATED',
      title: `Task Created: ${newTask.name}`,
      description: newTask.description,
      visibility: newTask.visibility,
      entityType: 'TASK',
      entityId: taskId,
      createdAt: now,
    });

    this.updateProject(projectId, { tasks: project.tasks, activities: project.activities });
    return newTask;
  }

  public static updateTask(projectId: string, taskId: string, updates: Partial<ProjectTask>): ProjectTask {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const index = project.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('Task not found');

    const existing = project.tasks[index];
    const newStatus = updates.status || existing.status;
    let newProgress = typeof updates.progress === 'number' ? updates.progress : existing.progress;

    if (newStatus === 'DONE') newProgress = 100;
    if (newStatus === 'TODO') newProgress = 0;

    const updatedTask: ProjectTask = {
      ...existing,
      ...updates,
      status: newStatus,
      progress: newProgress,
      updatedAt: new Date().toISOString(),
    };

    project.tasks[index] = updatedTask;

    // Unblock dependent tasks if this task is marked DONE
    if (newStatus === 'DONE') {
      project.tasks.forEach((t) => {
        if (t.dependsOnTaskId === taskId && t.status === 'BLOCKED') {
          t.status = 'TODO';
        }
      });
    }

    const activityVisibility: 'INTERNAL' | 'CUSTOMER_VISIBLE' = updatedTask.visibility;
    project.activities.unshift({
      id: `act_${Date.now()}`,
      projectId,
      userId: 'user',
      userName: updatedTask.assigneeName || 'Team Member',
      activityType: newStatus === 'DONE' ? 'TASK_COMPLETED' : 'TASK_UPDATED',
      title: `Task ${newStatus === 'DONE' ? 'Completed' : 'Updated'}: ${updatedTask.name}`,
      description: `Status: ${newStatus}, Progress: ${newProgress}%`,
      visibility: activityVisibility,
      entityType: 'TASK',
      entityId: taskId,
      createdAt: new Date().toISOString(),
    });

    this.updateProject(projectId, { tasks: project.tasks, activities: project.activities });
    return updatedTask;
  }

  public static addMilestone(projectId: string, milestoneData: Partial<FullProjectMilestone>): FullProjectMilestone {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const now = new Date().toISOString();
    const id = `ms_${Date.now()}`;
    const newMilestone: FullProjectMilestone = {
      id,
      projectId,
      name: milestoneData.name || 'New Milestone',
      description: milestoneData.description || '',
      status: milestoneData.status || 'UPCOMING',
      progress: milestoneData.progress || 0,
      weight: milestoneData.weight || 20,
      startDate: milestoneData.startDate || '2026-08-01',
      dueDate: milestoneData.dueDate || '2026-09-01',
      sortOrder: project.milestones.length + 1,
      ownerName: milestoneData.ownerName || project.projectManagerName,
    };

    project.milestones.push(newMilestone);
    this.updateProject(projectId, { milestones: project.milestones });
    return newMilestone;
  }

  public static addDocument(projectId: string, docData: Partial<FullProjectDocument>): FullProjectDocument {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const now = new Date().toISOString();
    const id = `doc_${Date.now()}`;
    const newDoc: FullProjectDocument = {
      id,
      projectId,
      name: docData.name || 'Project Document',
      type: docData.type || 'Specification',
      version: docData.version || 'v1.0',
      visibility: docData.visibility || 'CUSTOMER_VISIBLE',
      storageReference: docData.storageReference || '#',
      uploadedBy: docData.uploadedBy || 'SMART-AI.ID Team',
      fileSize: docData.fileSize || '2.4 MB',
      description: docData.description || '',
      downloadCount: 0,
      downloadLogs: [],
      createdAt: now,
    };

    project.documents.unshift(newDoc);
    project.activities.unshift({
      id: `act_${Date.now()}`,
      projectId,
      userId: 'system',
      userName: newDoc.uploadedBy,
      activityType: 'DOCUMENT_UPLOADED',
      title: `Document Uploaded: ${newDoc.name} (${newDoc.version})`,
      description: newDoc.description || `Category: ${newDoc.type}`,
      visibility: newDoc.visibility,
      entityType: 'DOCUMENT',
      entityId: id,
      createdAt: now,
    });

    this.updateProject(projectId, { documents: project.documents, activities: project.activities });
    return newDoc;
  }

  public static addMeeting(projectId: string, mtgData: Partial<ProjectMeetingItem>): ProjectMeetingItem {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const now = new Date().toISOString();
    const id = `mtg_${Date.now()}`;
    const newMtg: ProjectMeetingItem = {
      id,
      projectId,
      title: mtgData.title || 'Project Progress Review',
      description: mtgData.description || 'Routine progress alignment meeting.',
      date: mtgData.date || '2026-08-20',
      startTime: mtgData.startTime || '10:00',
      endTime: mtgData.endTime || '11:00',
      meetingType: mtgData.meetingType || 'Progress Meeting',
      meetingUrl: mtgData.meetingUrl || 'https://meet.google.com/smart-ai-project-sync',
      status: mtgData.status || 'SCHEDULED',
      participants: mtgData.participants || ['Client Team', 'Project Manager', 'Lead Developer'],
      visibility: mtgData.visibility || 'CUSTOMER_VISIBLE',
      notes: mtgData.notes || { customerVisibleNotes: 'Agenda: Architecture review and UAT plan.' },
      createdBy: mtgData.createdBy || project.projectManagerName,
      createdAt: now,
    };

    project.meetings.unshift(newMtg);
    this.updateProject(projectId, { meetings: project.meetings });
    return newMtg;
  }

  public static addUpdateNotice(projectId: string, updateData: Partial<ProjectUpdateNotice>): ProjectUpdateNotice {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const now = new Date().toISOString();
    const id = `upd_${Date.now()}`;
    const newUpdate: ProjectUpdateNotice = {
      id,
      projectId,
      title: updateData.title || 'Weekly Development Progress Update',
      content: updateData.content || 'Core module updates are progressing on schedule.',
      status: updateData.status || 'PUBLISHED',
      visibility: updateData.visibility || 'CUSTOMER_VISIBLE',
      author: updateData.author || project.projectManagerName,
      createdAt: now,
    };

    project.updates.unshift(newUpdate);
    project.activities.unshift({
      id: `act_${Date.now()}`,
      projectId,
      userId: 'pm',
      userName: newUpdate.author,
      activityType: 'UPDATE_POSTED',
      title: `Project Update Published: ${newUpdate.title}`,
      description: newUpdate.content.substring(0, 100) + '...',
      visibility: newUpdate.visibility,
      entityType: 'UPDATE',
      entityId: id,
      createdAt: now,
    });

    this.updateProject(projectId, { updates: project.updates, activities: project.activities });
    return newUpdate;
  }

  public static addChatMessage(projectId: string, msgData: Partial<ProjectChatMessage>): ProjectChatMessage {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const now = new Date().toISOString();
    const id = `msg_${Date.now()}`;
    const newMsg: ProjectChatMessage = {
      id,
      projectId,
      senderId: msgData.senderId || 'user',
      senderName: msgData.senderName || 'Client Representative',
      senderRole: msgData.senderRole || 'Client Team',
      senderType: msgData.senderType || 'CUSTOMER',
      message: msgData.message || '',
      attachments: msgData.attachments || [],
      timestamp: now,
      visibility: 'CUSTOMER_VISIBLE',
    };

    project.messages.push(newMsg);
    this.updateProject(projectId, { messages: project.messages });
    return newMsg;
  }

  /**
   * Recalculates phase, milestone, and overall progress & health status
   */
  public static refreshProjectCalculations(project: FullProjectRecord): FullProjectRecord {
    const tasks = project.tasks || [];
    const phases = (project.phases || []).map((phase) => {
      const prog = ProjectProgressService.calculatePhaseProgress(phase, tasks);
      let status = phase.status;
      if (prog === 100) status = 'COMPLETED';
      else if (prog > 0 && status === 'NOT_STARTED') status = 'IN_PROGRESS';
      return { ...phase, progress: prog, status };
    });

    const milestones = (project.milestones || []).map((m) => {
      const prog = ProjectProgressService.calculateMilestoneProgress(m, tasks);
      let status = m.status;
      if (prog === 100) status = 'COMPLETED';
      else if (prog > 0 && status === 'UPCOMING') status = 'IN_PROGRESS';
      return { ...m, progress: prog, status };
    });

    const overallProgress = ProjectProgressService.calculateOverallProgress(phases, tasks);
    let projectStatus = project.status;
    if (overallProgress === 100 && projectStatus !== 'CANCELLED') {
      projectStatus = 'COMPLETED';
    }

    const health = ProjectHealthService.evaluateProjectHealth({
      ...project,
      status: projectStatus,
      overallProgress,
      phases,
      milestones,
      tasks,
    });

    return {
      ...project,
      phases,
      milestones,
      overallProgress,
      status: projectStatus,
      health,
    };
  }

  /**
   * Sanitizes project object for Customer Portal view (Hides internal notes, tasks, risks, documents, and credentials)
   */
  public static filterForCustomer(project: FullProjectRecord): FullProjectRecord {
    return {
      ...project,
      tasks: (project.tasks || []).filter((t) => t.visibility === 'CUSTOMER_VISIBLE'),
      documents: (project.documents || []).filter((d) => d.visibility === 'CUSTOMER_VISIBLE'),
      meetings: (project.meetings || [])
        .filter((m) => m.visibility === 'CUSTOMER_VISIBLE')
        .map((m) => ({
          ...m,
          notes: {
            customerVisibleNotes: m.notes?.customerVisibleNotes || '',
          },
        })),
      updates: (project.updates || []).filter((u) => u.visibility === 'CUSTOMER_VISIBLE'),
      risks: (project.risks || []).filter((r) => r.visibility === 'CUSTOMER_VISIBLE'),
      issues: (project.issues || []).filter((i) => i.visibility === 'CUSTOMER_VISIBLE'),
      activities: (project.activities || []).filter((a) => a.visibility === 'CUSTOMER_VISIBLE'),
      messages: (project.messages || []).filter((m) => m.visibility === 'CUSTOMER_VISIBLE'),
      uatTestCases: (project.uatTestCases || []).filter((u) => u.visibility === 'CUSTOMER_VISIBLE'),
    };
  }

  /**
   * Generate robust seed projects if localStorage is empty
   */
  private static generateInitialSeedProjects(): FullProjectRecord[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'prj_global_logistics_01',
        projectNumber: 'PRJ-2026-001',
        companyId: 'comp_global_logistics',
        customerName: 'PT Global Logistics Indonesia',
        projectName: 'Fleet AI & Telematics Management System',
        description:
          'End-to-end IoT telematics, route optimization, AI fuel monitoring, and driver safety platform.',
        status: 'DEVELOPMENT',
        health: 'ON_TRACK',
        startDate: '2026-08-01',
        targetDate: '2026-10-31',
        overallProgress: 68,
        projectManagerId: 'pm_ahmad',
        projectManagerName: 'Ahmad PM (SMART-AI.ID)',
        industry: 'Logistics & Supply Chain',
        appType: 'Enterprise Full-Stack System',
        techStack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Gemini AI', 'PostgreSQL'],
        phases: [
          {
            id: 'ph_1',
            projectId: 'prj_global_logistics_01',
            name: 'Requirement',
            status: 'COMPLETED',
            progress: 100,
            weight: 10,
            startDate: '2026-08-01',
            dueDate: '2026-08-08',
            completedDate: '2026-08-07',
            sortOrder: 1,
            subItems: [
              { name: 'Telemetry Protocol Analysis', completed: true },
              { name: 'Fleet Manager & Driver Role Mapping', completed: true },
              { name: 'Gemini AI Anomaly Detection Requirement', completed: true },
            ],
          },
          {
            id: 'ph_2',
            projectId: 'prj_global_logistics_01',
            name: 'UI/UX',
            status: 'COMPLETED',
            progress: 100,
            weight: 15,
            startDate: '2026-08-08',
            dueDate: '2026-08-15',
            completedDate: '2026-08-14',
            sortOrder: 2,
            subItems: [
              { name: 'Real-time GPS Map Dashboard Wireframes', completed: true },
              { name: 'Mobile Driver Companion Layouts', completed: true },
              { name: 'Customer UI Review Approval', completed: true },
            ],
          },
          {
            id: 'ph_3',
            projectId: 'prj_global_logistics_01',
            name: 'Development',
            status: 'IN_PROGRESS',
            progress: 75,
            weight: 45,
            startDate: '2026-08-15',
            dueDate: '2026-09-30',
            sortOrder: 3,
            subItems: [
              { name: 'Real-time Telematics API Ingestion', completed: true },
              { name: 'Interactive Map & Geofencing Component', completed: true },
              { name: 'AI Fuel Theft & Consumption Engine', completed: true },
              { name: 'Maintenance Alert & Dispatch Workflow', completed: false },
            ],
          },
          {
            id: 'ph_4',
            projectId: 'prj_global_logistics_01',
            name: 'Testing',
            status: 'IN_PROGRESS',
            progress: 30,
            weight: 20,
            startDate: '2026-09-20',
            dueDate: '2026-10-15',
            sortOrder: 4,
            subItems: [
              { name: 'High-Volume Stream Stress Testing', completed: false },
              { name: 'UAT Case Sign-off Preparation', completed: false },
            ],
          },
          {
            id: 'ph_5',
            projectId: 'prj_global_logistics_01',
            name: 'Deployment',
            status: 'NOT_STARTED',
            progress: 0,
            weight: 10,
            startDate: '2026-10-15',
            dueDate: '2026-10-31',
            sortOrder: 5,
            subItems: [
              { name: 'Production Cloud Run Container Launch', completed: false },
              { name: 'Operations Handover & Training', completed: false },
            ],
          },
        ],
        milestones: [
          {
            id: 'ms_1',
            projectId: 'prj_global_logistics_01',
            name: 'Milestone 1: Requirement & System Architecture Approved',
            description: 'Finalize technical scope, data pipelines, and security architecture.',
            status: 'COMPLETED',
            progress: 100,
            weight: 15,
            startDate: '2026-08-01',
            dueDate: '2026-08-08',
            completedDate: '2026-08-07',
            sortOrder: 1,
            ownerName: 'Ahmad PM',
          },
          {
            id: 'ms_2',
            projectId: 'prj_global_logistics_01',
            name: 'Milestone 2: Interactive UI/UX Prototype Sign-Off',
            description: 'Approved desktop and responsive mobile dashboard layouts.',
            status: 'COMPLETED',
            progress: 100,
            weight: 20,
            startDate: '2026-08-08',
            dueDate: '2026-08-15',
            completedDate: '2026-08-14',
            sortOrder: 2,
            ownerName: 'Siti Lead Designer',
          },
          {
            id: 'ms_3',
            projectId: 'prj_global_logistics_01',
            name: 'Milestone 3: Core AI Telematics Engine & Dispatch Backend',
            description: 'Live GPS stream integration and automated AI route optimization.',
            status: 'IN_PROGRESS',
            progress: 80,
            weight: 35,
            startDate: '2026-08-15',
            dueDate: '2026-09-20',
            sortOrder: 3,
            ownerName: 'Budi Lead Developer',
          },
          {
            id: 'ms_4',
            projectId: 'prj_global_logistics_01',
            name: 'Milestone 4: Testing & Customer UAT Acceptance',
            description: 'Conduct stress tests and client operational validation.',
            status: 'UPCOMING',
            progress: 10,
            weight: 20,
            startDate: '2026-09-20',
            dueDate: '2026-10-15',
            sortOrder: 4,
            ownerName: 'Dewi QA Lead',
          },
          {
            id: 'ms_5',
            projectId: 'prj_global_logistics_01',
            name: 'Milestone 5: Production Go-Live & System Handover',
            description: 'Final cloud deployment and operational team training.',
            status: 'UPCOMING',
            progress: 0,
            weight: 10,
            startDate: '2026-10-15',
            dueDate: '2026-10-31',
            sortOrder: 5,
            ownerName: 'Ahmad PM',
          },
        ],
        tasks: [
          {
            id: 'tsk_01',
            projectId: 'prj_global_logistics_01',
            milestoneId: 'ms_1',
            phaseName: 'Requirement',
            name: 'Finalize Telematics API Protocol Specification',
            description: 'Document TCP/UDP packet formats for GPS OBD-II devices.',
            status: 'DONE',
            priority: 'HIGH',
            progress: 100,
            assigneeName: 'Rian Architect',
            assigneeRole: 'Developer',
            dueDate: '2026-08-06',
            weight: 1,
            visibility: 'CUSTOMER_VISIBLE',
            labels: ['Requirement', 'Backend'],
            createdAt: '2026-08-01T09:00:00Z',
            updatedAt: '2026-08-06T17:00:00Z',
          },
          {
            id: 'tsk_02',
            projectId: 'prj_global_logistics_01',
            milestoneId: 'ms_2',
            phaseName: 'UI/UX',
            name: 'Design Interactive Real-Time Map & Route Planner UI',
            description: 'Figma mockups for dark and light fleet monitoring dashboard.',
            status: 'DONE',
            priority: 'HIGH',
            progress: 100,
            assigneeName: 'Siti Designer',
            assigneeRole: 'Designer',
            dueDate: '2026-08-14',
            weight: 1,
            visibility: 'CUSTOMER_VISIBLE',
            labels: ['UI/UX'],
            createdAt: '2026-08-08T09:00:00Z',
            updatedAt: '2026-08-14T16:00:00Z',
          },
          {
            id: 'tsk_03',
            projectId: 'prj_global_logistics_01',
            milestoneId: 'ms_3',
            phaseName: 'Development',
            name: 'Implement AI Fuel Anomaly Detection Engine (Gemini SDK)',
            description: 'Detect sudden drops in fuel sensors using Gemini AI pattern recognition.',
            status: 'DONE',
            priority: 'URGENT',
            progress: 100,
            assigneeName: 'Budi Lead Dev',
            assigneeRole: 'Developer',
            dueDate: '2026-08-25',
            weight: 2,
            visibility: 'CUSTOMER_VISIBLE',
            labels: ['AI Engine', 'Backend'],
            createdAt: '2026-08-15T09:00:00Z',
            updatedAt: '2026-08-24T18:00:00Z',
          },
          {
            id: 'tsk_04',
            projectId: 'prj_global_logistics_01',
            milestoneId: 'ms_3',
            phaseName: 'Development',
            name: 'Build Automated Maintenance Dispatch Workflow',
            description: 'Trigger maintenance tickets when vehicle mileage exceeds threshold.',
            status: 'IN_PROGRESS',
            priority: 'MEDIUM',
            progress: 60,
            assigneeName: 'Andi Backend Dev',
            assigneeRole: 'Developer',
            dueDate: '2026-09-05',
            weight: 1,
            visibility: 'CUSTOMER_VISIBLE',
            labels: ['Feature', 'Backend'],
            createdAt: '2026-08-20T09:00:00Z',
            updatedAt: '2026-08-28T10:00:00Z',
          },
          {
            id: 'tsk_05',
            projectId: 'prj_global_logistics_01',
            milestoneId: 'ms_3',
            phaseName: 'Development',
            name: 'Internal Redis Pub/Sub Stream Optimization',
            description: 'Optimize internal memory cache for 10,000 concurrent OBD telemetry streams.',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
            progress: 75,
            assigneeName: 'DevOps Team',
            assigneeRole: 'DevOps',
            dueDate: '2026-09-10',
            weight: 2,
            visibility: 'INTERNAL', // Hidden from customer
            labels: ['Internal', 'Infrastructure'],
            createdAt: '2026-08-22T09:00:00Z',
            updatedAt: '2026-08-28T12:00:00Z',
          },
        ],
        documents: [
          {
            id: 'doc_brd_01',
            projectId: 'prj_global_logistics_01',
            name: 'Business Requirement Document (BRD) - Fleet AI',
            type: 'Requirement Document',
            version: 'v1.1',
            visibility: 'CUSTOMER_VISIBLE',
            storageReference: '#',
            uploadedBy: 'Ahmad PM',
            fileSize: '3.8 MB',
            description: 'Approved functional and business specifications.',
            downloadCount: 14,
            createdAt: '2026-08-07T14:00:00Z',
          },
          {
            id: 'doc_spec_02',
            projectId: 'prj_global_logistics_01',
            name: 'System Architecture & API Integration Blueprint',
            type: 'Specification',
            version: 'v2.0',
            visibility: 'CUSTOMER_VISIBLE',
            storageReference: '#',
            uploadedBy: 'Rian Architect',
            fileSize: '5.1 MB',
            description: 'Technical architecture, DB schemas, and security guidelines.',
            downloadCount: 9,
            createdAt: '2026-08-12T10:00:00Z',
          },
          {
            id: 'doc_sec_03',
            projectId: 'prj_global_logistics_01',
            name: 'Internal Penetration Test Security Audit',
            type: 'Specification',
            version: 'v1.0',
            visibility: 'INTERNAL',
            storageReference: '#',
            uploadedBy: 'Security Team',
            fileSize: '1.2 MB',
            description: 'Internal vulnerability scan logs.',
            downloadCount: 2,
            createdAt: '2026-08-25T11:00:00Z',
          },
        ],
        meetings: [
          {
            id: 'mtg_01',
            projectId: 'prj_global_logistics_01',
            title: 'Weekly Progress & AI Module Review',
            description: 'Review fuel anomaly detection AI model and UI feedback.',
            date: '2026-08-28',
            startTime: '10:00',
            endTime: '11:00',
            meetingType: 'Development Review',
            meetingUrl: 'https://meet.google.com/smart-ai-logistics-review',
            status: 'COMPLETED',
            participants: ['Bpk. Hendra (Client VP Ops)', 'Ahmad PM', 'Budi Lead Dev'],
            visibility: 'CUSTOMER_VISIBLE',
            notes: {
              customerVisibleNotes: 'Client approved the fuel anomaly AI logic. Next demo scheduled for UAT preparation.',
              internalNotes: 'Need to tune anomaly thresholds for heavy diesel trucks.',
            },
            createdBy: 'Ahmad PM',
            createdAt: '2026-08-25T08:00:00Z',
          },
        ],
        updates: [
          {
            id: 'upd_01',
            projectId: 'prj_global_logistics_01',
            title: 'Development Phase Reaches 75% Completion',
            content:
              'We have successfully integrated the real-time GPS map tracking and AI fuel theft detection engine. All modules are passing initial test suites.',
            status: 'PUBLISHED',
            visibility: 'CUSTOMER_VISIBLE',
            author: 'Ahmad PM',
            createdAt: '2026-08-26T09:00:00Z',
          },
        ],
        risks: [
          {
            id: 'risk_01',
            projectId: 'prj_global_logistics_01',
            title: 'Potential OBD Hardware Firmware Latency',
            description: 'Some legacy GPS devices send delayed packets during cellular network drops.',
            impact: 'Minor data lag on real-time map during cellular outage.',
            probability: 'MEDIUM',
            severity: 'LOW',
            mitigation: 'Implement local device buffer storage and batch retry queue.',
            status: 'MITIGATED',
            visibility: 'CUSTOMER_VISIBLE',
            createdAt: '2026-08-18T10:00:00Z',
          },
        ],
        issues: [
          {
            id: 'iss_01',
            projectId: 'prj_global_logistics_01',
            title: 'Map Geofence Rendering Optimization',
            description: 'Multiple overlapping geofences cause slight frame drop on mobile browsers.',
            severity: 'MEDIUM',
            status: 'IN_PROGRESS',
            dueDate: '2026-09-02',
            resolution: 'Applying SVG canvas virtualization.',
            visibility: 'CUSTOMER_VISIBLE',
            createdAt: '2026-08-22T14:00:00Z',
          },
        ],
        releases: [
          {
            id: 'rel_01',
            projectId: 'prj_global_logistics_01',
            version: 'v0.8.0-beta',
            releaseDate: '2026-08-25',
            status: 'RELEASED',
            environment: 'Staging',
            releaseNotes: {
              newFeatures: ['Real-time Telematics Map', 'AI Fuel Theft Alerting', 'Driver Scorecard'],
              bugFixes: ['Fixed timezone calculation in trip reports'],
              improvements: ['Enhanced map marker rendering speed by 40%'],
            },
            createdAt: '2026-08-25T16:00:00Z',
          },
        ],
        uatTestCases: [
          {
            id: 'uat_01',
            projectId: 'prj_global_logistics_01',
            testCase: 'Real-time GPS Tracking Verification',
            description: 'Verify live vehicle coordinates update every 10 seconds on dashboard.',
            expectedResult: 'Vehicle icon moves smoothly and displays driver name and speed.',
            actualResult: 'Tested successfully on staging environment.',
            status: 'PASSED',
            tester: 'Bpk. Hendra (Client QA)',
            date: '2026-08-26',
            notes: 'Approved during development review.',
            visibility: 'CUSTOMER_VISIBLE',
          },
          {
            id: 'uat_02',
            projectId: 'prj_global_logistics_01',
            testCase: 'AI Fuel Anomaly Alert Delivery',
            description: 'Trigger sudden fuel drop simulation and check email/dashboard alert.',
            expectedResult: 'Alert pops up within 5 seconds with vehicle ID and location.',
            actualResult: 'Passed with instant popup alert.',
            status: 'PASSED',
            tester: 'Ibu Maya (Client Finance)',
            date: '2026-08-27',
            notes: 'Email notification received correctly.',
            visibility: 'CUSTOMER_VISIBLE',
          },
        ],
        uatApproval: {
          id: 'uat_app_01',
          projectId: 'prj_global_logistics_01',
          status: 'PENDING',
          approvedBy: 'Bpk. Hendra',
          comments: 'Beta deployment approved. Preparing final formal UAT signoff.',
        },
        messages: [
          {
            id: 'msg_01',
            projectId: 'prj_global_logistics_01',
            senderId: 'client_01',
            senderName: 'Bpk. Hendra',
            senderRole: 'VP Operations',
            senderType: 'CUSTOMER',
            message: 'Hello Ahmad, when will the driver mobile app build be ready for staging testing?',
            timestamp: '2026-08-26T10:15:00Z',
            visibility: 'CUSTOMER_VISIBLE',
          },
          {
            id: 'msg_02',
            projectId: 'prj_global_logistics_01',
            senderId: 'pm_ahmad',
            senderName: 'Ahmad PM',
            senderRole: 'Project Manager',
            senderType: 'PM',
            message:
              'Selamat pagi Bpk. Hendra! The driver companion APK/Web PWA build is scheduled for release on September 2. We will upload the staging download link here.',
            timestamp: '2026-08-26T10:20:00Z',
            visibility: 'CUSTOMER_VISIBLE',
          },
        ],
        activities: [
          {
            id: 'act_101',
            projectId: 'prj_global_logistics_01',
            userId: 'dev_budi',
            userName: 'Budi Lead Dev',
            activityType: 'TASK_COMPLETED',
            title: 'Task Completed: AI Fuel Anomaly Detection Engine',
            description: 'Integrated Gemini AI SDK for predictive telemetry checks.',
            visibility: 'CUSTOMER_VISIBLE',
            createdAt: '2026-08-24T18:00:00Z',
          },
          {
            id: 'act_102',
            projectId: 'prj_global_logistics_01',
            userId: 'pm_ahmad',
            userName: 'Ahmad PM',
            activityType: 'UPDATE_POSTED',
            title: 'Update Published: Development Phase Reaches 75%',
            description: 'Published weekly update to client portal.',
            visibility: 'CUSTOMER_VISIBLE',
            createdAt: '2026-08-26T09:00:00Z',
          },
        ],
        timeline: [
          {
            id: 'tl_01',
            projectId: 'prj_global_logistics_01',
            date: '2026-08-01',
            title: 'Requirement Phase Started',
            description: 'Initial kickoff and stakeholder interviews.',
            type: 'PHASE',
            status: 'COMPLETED',
            createdBy: 'Ahmad PM',
            createdAt: '2026-08-01T09:00:00Z',
          },
          {
            id: 'tl_02',
            projectId: 'prj_global_logistics_01',
            date: '2026-08-07',
            title: 'Requirement Document Approved',
            description: 'BRD v1.1 signed off by client.',
            type: 'DOCUMENT',
            status: 'COMPLETED',
            createdBy: 'Ahmad PM',
            createdAt: '2026-08-07T14:00:00Z',
          },
          {
            id: 'tl_03',
            projectId: 'prj_global_logistics_01',
            date: '2026-08-14',
            title: 'UI/UX Interactive Prototype Approved',
            description: 'Figma wireframes approved.',
            type: 'MILESTONE',
            status: 'COMPLETED',
            createdBy: 'Siti Lead Designer',
            createdAt: '2026-08-14T16:00:00Z',
          },
          {
            id: 'tl_04',
            projectId: 'prj_global_logistics_01',
            date: '2026-08-15',
            title: 'Core Development Phase Commenced',
            description: 'Backend & AI Telematics engine build started.',
            type: 'PHASE',
            status: 'IN_PROGRESS',
            createdBy: 'Budi Lead Dev',
            createdAt: '2026-08-15T09:00:00Z',
          },
        ],
        financialSummary: {
          contractValue: 250000000,
          invoiced: 125000000,
          paid: 125000000,
          outstanding: 125000000,
          currency: 'IDR',
        },
        createdAt: '2026-08-01T08:00:00Z',
        updatedAt: now,
      },
    ];
  }
}
