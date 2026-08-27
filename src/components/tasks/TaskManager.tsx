import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  ArrowRight,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Task, TaskPriority, TaskStatus } from '../../types';
import { PriorityBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/Toast';

export const TaskManager: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, wedding, showToast } = useWedding();

  const [activeView, setActiveView] = useState<'kanban' | 'list'>('kanban');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('Decoration');
  const [assignedTo, setAssignedTo] = useState(`Groom (${wedding.groomName.split(' ')[0]})`);
  const [assignedRole, setAssignedRole] = useState('Groom');
  const [dueDate, setDueDate] = useState('2026-11-20');
  const [priority, setPriority] = useState<TaskPriority>('high');
  const [notes, setNotes] = useState('');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const columns: { id: TaskStatus; title: string; color: string; icon: React.ReactNode }[] = [
    { id: 'pending', title: 'To Be Done', color: 'border-stone-300 bg-stone-50', icon: <Clock className="w-4 h-4 text-stone-600" /> },
    { id: 'in_progress', title: 'In Progress', color: 'border-amber-300 bg-amber-50/50', icon: <Clock className="w-4 h-4 text-amber-600" /> },
    { id: 'completed', title: 'Completed', color: 'border-emerald-300 bg-emerald-50/50', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
    { id: 'overdue', title: 'Attention / Overdue', color: 'border-rose-300 bg-rose-50/50', icon: <AlertTriangle className="w-4 h-4 text-rose-600" /> },
  ];

  const handleSaveTask = (e: React.FormEvent) => {
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
      notes: notes || undefined,
    });

    setIsAddModalOpen(false);
    setTitle('');
    setNotes('');
  };

  const handleMoveStatus = (task: Task, newStatus: TaskStatus) => {
    updateTask(task.id, { status: newStatus });
    showToast(`Task moved to ${newStatus.replace('_', ' ')}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Karya & Zimmedari
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Task Kanban & Checklist Manager
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Assign duties to bride, groom, family members, and coordinators with live status boards.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#E2D8C6]">
              <button
                onClick={() => setActiveView('kanban')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'kanban' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'list' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                List
              </button>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="pt-4 flex items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks, assignees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
            />
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {filteredTasks.length} tasks matching
          </span>
        </div>
      </div>

      {/* 1. Kanban Board View */}
      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className={`rounded-3xl p-4 border ${col.color} flex flex-col min-h-[500px] shadow-2xs`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/60">
                  <div className="flex items-center gap-2">
                    {col.icon}
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2C1810]">
                      {col.title}
                    </h3>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-white text-stone-800 text-[10px] font-bold flex items-center justify-center border border-stone-200">
                    {colTasks.length}
                  </span>
                </div>

                {/* Tasks Column */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF0E1] text-[#7A1C2E] border border-[#D4AF37]/30">
                          {task.category}
                        </span>
                        <PriorityBadge priority={task.priority} />
                      </div>

                      <h4 className="font-bold text-xs text-[#2C1810] leading-snug">{task.title}</h4>

                      {task.notes && <p className="text-[11px] text-stone-500 leading-tight">{task.notes}</p>}

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="flex items-center gap-1 font-medium text-stone-700">
                          <User className="w-3 h-3 text-stone-400" />
                          {task.assignedTo}
                        </span>
                        <span className="flex items-center gap-1 text-amber-800 font-medium">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          {task.dueDate}
                        </span>
                      </div>

                      {/* Quick Move Buttons */}
                      <div className="pt-2 flex items-center justify-between">
                        <select
                          value={task.status}
                          onChange={(e) => handleMoveStatus(task, e.target.value as TaskStatus)}
                          className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-[10px] font-bold text-stone-700 outline-none"
                        >
                          <option value="pending">To-Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="overdue">Overdue</option>
                        </select>

                        <button
                          onClick={() => setTaskToDelete(task)}
                          className="p-1 hover:bg-rose-100 rounded text-rose-600"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. List View */}
      {activeView === 'list' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8DFD0] text-stone-500 font-heading text-[11px] uppercase tracking-wider">
                <th className="pb-3 px-3">Task Title</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Assigned To</th>
                <th className="pb-3 px-3">Due Date</th>
                <th className="pb-3 px-3">Priority</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-3 font-bold text-stone-900 font-heading">{t.title}</td>
                  <td className="py-3 px-3 text-stone-600">{t.category}</td>
                  <td className="py-3 px-3 font-medium text-stone-800">{t.assignedTo}</td>
                  <td className="py-3 px-3 text-amber-800 font-medium">{t.dueDate}</td>
                  <td className="py-3 px-3">
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td className="py-3 px-3">
                    <span className="capitalize font-bold text-[11px] text-stone-700">
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setTaskToDelete(t)}
                      className="p-1 hover:bg-rose-100 rounded text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Create Wedding Task</h3>
            <p className="text-xs text-stone-500 mb-5">Assign to couple, family or wedding coordinator</p>

            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Confirm baraat vintage car & dhol players"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
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
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Photography">Photography</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Invitations">Invitations</option>
                    <option value="Travel">Travel</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
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
                    required
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
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
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional guidelines or contact links..."
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!taskToDelete}
        title="Delete Task?"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        confirmLabel="Delete Task"
        isDestructive={true}
        onConfirm={() => {
          if (taskToDelete) {
            deleteTask(taskToDelete.id);
            setTaskToDelete(null);
          }
        }}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
};
