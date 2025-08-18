'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface LogoutConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
}

/**
 * Logout confirmation dialog component
 * Shows a confirmation modal before logging out the user
 */
export function LogoutConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: LogoutConfirmationDialogProps) {
  /**
   * Handle confirm logout
   */
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  /**
   * Handle cancel logout
   */
  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="h-8 w-8 text-destructive" 
            />
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground text-center">
            Cerrar Sesión
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            ¿Estás seguro de que quieres cerrar tu sesión? 
            Tendrás que volver a iniciar sesión para acceder al panel de administración.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="sm:min-w-[100px]"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="sm:min-w-[100px]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Cerrando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
