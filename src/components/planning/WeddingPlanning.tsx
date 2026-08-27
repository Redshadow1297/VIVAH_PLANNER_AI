import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  UtensilsCrossed,
  Sparkles,
  Camera,
  Scissors,
  Shirt,
  Mail,
  Plane,
  Home,
  Music,
  Plus,
  ChevronRight,
  Filter,
  Calendar,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Task } from '../../types';

export const WeddingPlanning: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, setActiveTab, showToast } = useWedding();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New task form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('Venue');
  const [assignedTo, setAssignedTo] = useState('Priya Sharma');
  const [assignedRole, setAssignedRole] = useState('Owner');
  const [dueDate, setDueDate] = useState('2026-11-15');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [notes, setNotes] = useState('');

  const categories: { name: Task['category'] | 'All'; icon: React.ReactNode }[] = [
    { name: 'All', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Venue', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Catering', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { name: 'Decoration', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Photography', icon: <Camera className="w-4 h-4" /> },
    { name: 'Makeup', icon: <Scissors className="w-4 h-4" /> },
    { name: 'Clothing', icon: <Shirt className="w-4 h-4" /> },
    { name: 'Invitations', icon: <Mail className="w-4 h-4" /> },
    { name: 'Travel', icon: <Plane className="w-4 h-4" /> },
    { name: 'Accommodation', icon: <Home className="w-4 h-4" /> },
    { name: 'Entertainment', icon: <Music className="w-4 h-4" /> },
  ];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const overdueTasks = tasks.filter((t) => t.status === 'overdue');

  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter((t) => t.category === selectedCategory);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title,
      category,
      assignedTo,
      assignedRole,
      dueDate,
      priority,
      status: 'pending',
      notes,
    });
    setIsNewTaskModalOpen(false);
    setTitle('');
    setNotes('');
  };

  const handleToggleTaskStatus = (task: Task) => {
    const nextStatus: Task['status'] = task.status === 'completed' ? 'in_progress' : 'completed';
    updateTask(task.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Overall Progress Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Planning Command Center
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Wedding Checklist & Category Progress
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Track milestones, assigned family coordinators, vendor deliverables, and deadlines.
            </p>
          </div>

          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-5 py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all self-start lg:self-center shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Planning Task</span>
          </button>
        </div>

        {/* Big Progress Metric Bar */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-[#2C1810]">Overall Readiness:</span>
              <span className="font-heading text-2xl font-extrabold text-[#7A1C2E]">{progressPercentage}%</span>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {completedTasks.length} of {totalTasks} milestones completed
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#FAF6F0] border border-[#E2D8C6] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-[#B45309] to-[#7A1C2E] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* 4 Status Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-emerald-900">{completedTasks.length}</div>
              <div className="text-[11px] text-emerald-700 font-medium">Completed</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-amber-900">{inProgressTasks.length}</div>
              <div className="text-[11px] text-amber-700 font-medium">In Progress</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-stone-900">{pendingTasks.length}</div>
              <div className="text-[11px] text-stone-700 font-medium">To Be Started</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-rose-900">{overdueTasks.length}</div>
              <div className="text-[11px] text-rose-700 font-medium">Attention Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.name
                ? 'bg-[#7A1C2E] text-white shadow-md'
                : 'bg-white border border-[#E8DFD0] text-stone-700 hover:bg-[#F2ECE0]'
            }`}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Checklist Tasks Table & Cards */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
          <h3 className="font-heading text-base font-bold text-[#2C1810]">
            {selectedCategory === 'All' ? 'All Planning Milestones' : `${selectedCategory} Tasks`} ({filteredTasks.length})
          </h3>
          <button
            onClick={() => setActiveTab('tasks')}
            className="text-xs font-bold text-[#7A1C2E] hover:underline flex items-center gap-1"
          >
            Open Interactive Kanban Board →
          </button>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.status === 'completed'
                  ? 'bg-stone-50/70 border-stone-200 opacity-80'
                  : 'bg-[#FAF7F2] border-[#E8DFD0] hover:border-[#D4AF37]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => handleToggleTaskStatus(task)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    task.status === 'completed'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-400 hover:border-[#7A1C2E] bg-white'
                  }`}
                >
                  {task.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="space-y-1">
                  <div
                    className={`text-sm font-bold text-[#2C1810] ${
                      task.status === 'completed' ? 'line-through text-stone-500' : ''
                    }`}
                  >
                    {task.title}
                  </div>
                  {task.notes && <p className="text-xs text-stone-500">{task.notes}</p>}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF0E1] text-[#7A1C2E] border border-[#D4AF37]/40">
                      {task.category}
                    </span>
                    <span className="text-xs text-stone-600 font-medium">
                      Assigned: <strong className="text-stone-800">{task.assignedTo}</strong> ({task.assignedRole})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <div className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    Due: {task.dueDate}
                  </div>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.priority === 'urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : task.priority === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Task */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Add Planning Task</h3>
            <p className="text-xs text-stone-500 mb-5">Assign to bride, groom, family or wedding coordinator</p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Taste & approve Sangeet royal dessert bar"
                  className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Task['category'])}
                    className="w-full px-3 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-xs font-medium outline-none"
                  >
                    {categories.filter((c) => c.name !== 'All').map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task['priority'])}
                    className="w-full px-3 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-xs font-medium outline-none"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent / Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Assigned Person
                  </label>
                  <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Notes & Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specific requirements or vendor contacts..."
                  className="w-full px-4 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
