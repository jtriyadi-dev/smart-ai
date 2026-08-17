import { ProjectTask, ProjectPhaseDetails, FullProjectMilestone, FullProjectRecord } from '../types';

export class ProjectProgressService {
  /**
   * Calculate task progress percentage (0 - 100)
   */
  public static calculateTaskProgress(task: Partial<ProjectTask>): number {
    if (task.status === 'DONE') return 100;
    if (task.status === 'TODO' || task.status === 'CANCELLED') return 0;
    if (typeof task.progress === 'number') {
      return Math.min(100, Math.max(0, task.progress));
    }
    return 50; // Default for IN_PROGRESS
  }

  /**
   * Calculate milestone progress from linked tasks or manual setting
   */
  public static calculateMilestoneProgress(milestone: FullProjectMilestone, tasks: ProjectTask[]): number {
    const milestoneTasks = tasks.filter((t) => t.milestoneId === milestone.id);
    if (milestoneTasks.length === 0) {
      if (milestone.status === 'COMPLETED') return 100;
      return milestone.progress || 0;
    }

    const totalWeight = milestoneTasks.reduce((acc, t) => acc + (t.weight || 1), 0);
    const weightedSum = milestoneTasks.reduce((acc, t) => {
      const p = this.calculateTaskProgress(t);
      return acc + p * (t.weight || 1);
    }, 0);

    return Math.round(weightedSum / totalWeight);
  }

  /**
   * Calculate phase progress percentage from tasks or sub-items
   */
  public static calculatePhaseProgress(phase: ProjectPhaseDetails, tasks: ProjectTask[]): number {
    if (phase.status === 'COMPLETED') return 100;
    if (phase.status === 'NOT_STARTED') return 0;

    const phaseTasks = tasks.filter((t) => t.phaseName === phase.name);
    if (phaseTasks.length > 0) {
      const totalWeight = phaseTasks.reduce((acc, t) => acc + (t.weight || 1), 0);
      const weightedSum = phaseTasks.reduce((acc, t) => {
        const p = this.calculateTaskProgress(t);
        return acc + p * (t.weight || 1);
      }, 0);
      return Math.round(weightedSum / totalWeight);
    }

    if (phase.subItems && phase.subItems.length > 0) {
      const completedCount = phase.subItems.filter((s) => s.completed).length;
      return Math.round((completedCount / phase.subItems.length) * 100);
    }

    return phase.progress || 0;
  }

  /**
   * Calculate overall project progress based on weighted phases
   * Requirement 10% | UI/UX 15% | Development 45% | Testing 20% | Deployment 10%
   */
  public static calculateOverallProgress(phases: ProjectPhaseDetails[], tasks: ProjectTask[]): number {
    if (!phases || phases.length === 0) return 0;

    let totalWeightedProgress = 0;
    let totalWeight = 0;

    phases.forEach((p) => {
      const pProg = this.calculatePhaseProgress(p, tasks);
      const w = p.weight || 20;
      totalWeightedProgress += pProg * (w / 100);
      totalWeight += w;
    });

    if (totalWeight === 0) return 0;
    const finalProg = Math.round((totalWeightedProgress / (totalWeight / 100)));
    return Math.min(100, Math.max(0, finalProg));
  }
}
