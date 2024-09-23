'use client'
import { Plus, X } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategory } from '@/actions/dataFetch'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function CreateCategoryForm() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const createCategorySchema = z.object({
    name: z.string().min(1, 'Informe a atividade que deseja praticar'),
  })

  type CreateGoalSchema = z.infer<typeof createCategorySchema>
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // control,
    reset,
  } = useForm<CreateGoalSchema>({
    resolver: zodResolver(createCategorySchema),
  })

  async function handleCreateCategory({ name }: CreateGoalSchema) {
    try {
      await createCategory({
        nameInput: name,
      })
      reset()
      queryClient.invalidateQueries({ queryKey: ['summary-categories'] })
      toast.success('Categoria criada com sucesso!')
      setIsOpen(false)
    } catch {
      toast.error('Erro ao criar a categoria, tente novamente!')
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus className="size-4" />
          Criar Categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Criar Categoria</DialogTitle>

              <DialogClose>
                <X className="size-5 text-zinc-600" />
              </DialogClose>
            </div>

            <DialogDescription>
              Adicione uma categoria para organizar suas metas.
            </DialogDescription>
          </div>
          <form
            id="create-category"
            onSubmit={handleSubmit(handleCreateCategory)}
            className="flex-1 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Qual o nome da categoria?</Label>

              <Input
                id="name"
                autoFocus
                placeholder="Saúde, estudo, etc..."
                {...register('name')}
              />
            </div>
            <div className="flex items-center gap-3 mt-auto">
              <DialogClose asChild>
                <Button variant="secondary" className="flex-1">
                  Fechar
                </Button>
              </DialogClose>

              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
