import React from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  agendamentoId: number;
  currentStatus: string;
  onConfirm: (newStatus: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  agendamentoId,
  currentStatus,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState(currentStatus);

  React.useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus, isOpen]);

  if (!isOpen) return null;

  const statuses = [
    { value: 'agendado', label: 'Agendado', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { value: 'confirmado', label: 'Confirmado', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { value: 'concluido', label: 'Concluído', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  ];

  const currentStatusObj = statuses.find(s => s.value === currentStatus);
  const selectedStatusObj = statuses.find(s => s.value === selectedStatus);

  const handleConfirm = () => {
    if (selectedStatus !== currentStatus) {
      onConfirm(selectedStatus);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 transition-opacity duration-200'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
        {/* Header */}
        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
            <CheckCircle2 className='text-blue-600 dark:text-blue-400' size={24} />
            Alterar Status
          </h2>
          <button
            onClick={onCancel}
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition'
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='px-6 py-6 space-y-6'>
          {/* ID do Agendamento */}
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
            <AlertCircle size={16} />
            <span>Agendamento #{agendamentoId}</span>
          </div>

          {/* Status Atual */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              Status Atual:
            </label>
            <div className={`px-3 py-2 rounded text-center font-semibold ${currentStatusObj?.color}`}>
              {currentStatusObj?.label}
            </div>
          </div>

          {/* Seletor de Status */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
              Novo Status:
            </label>
            <div className='grid grid-cols-2 gap-2'>
              {statuses.map(status => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`p-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    selectedStatus === status.value
                      ? `${status.color} ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-blue-600`
                      : `${status.color} opacity-50 hover:opacity-75`
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aviso de Mudança */}
          {selectedStatus !== currentStatus && (
            <div className='p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <p className='text-sm text-blue-800 dark:text-blue-300'>
                ✓ Status será alterado de <strong>{currentStatusObj?.label}</strong> para{' '}
                <strong>{selectedStatusObj?.label}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || selectedStatus === currentStatus}
            className='flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Atualizando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};
