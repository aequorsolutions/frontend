'use client'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { createGoal } from '../http/create-goal'
import { toast } from 'sonner'
import { createGoal } from '@/actions/dataFetch'
import type { cateoryListType } from '@/actions/dataFetch'
import { useQueryClient } from '@tanstack/react-query'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { CreateCategoryForm } from './CreateCategoryForm'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja praticar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalSchema = z.infer<typeof createGoalSchema>
const emojiListWeek = ['🥱', '😴', '😐', '🙂', '😊', '😁', '🤩']
const emojiListMonth = ['🥱', '🙂', '😁', '🤩']

export function CreateGoal({
  categories,
  setIsOpen,
}: {
  categories: cateoryListType
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()
  const [type, setType] = useState('weekly')
  const [category, setCategory] = useState('uncategorized-id')

  const [numberOfOptions, setNumberOfOptions] = useState(7)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
  })
  function hangleNumberOfOptions(type: string) {
    switch (type) {
      case 'monthly':
        setNumberOfOptions(4)
        break
      default:
        setNumberOfOptions(7)
    }
  }
  async function handleCreateGoal({
    title,
    desiredWeeklyFrequency,
  }: CreateGoalSchema) {
    try {
      await createGoal({
        title,
        category,
        type,
        desiredWeeklyFrequency,
      })
      reset()
      setType('weekly')
      setCategory('uncategorized-id')
      queryClient.invalidateQueries({ queryKey: ['pending-goals-month'] })
      queryClient.invalidateQueries({ queryKey: ['summary-week'] })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      queryClient.invalidateQueries({ queryKey: ['summary-month'] })
      toast.success('Meta criada com sucesso!')
      setIsOpen(false)
    } catch {
      toast.error('Erro ao criar a meta, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          id="create-goal"
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>

              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>
            <ToggleGroup.Root
              type="single"
              value={type}
              className="flex gap-3"
              onValueChange={value => {
                if (value) {
                  setType(value)
                  hangleNumberOfOptions(value)
                }
              }}
            >
              <ToggleGroup.Item
                className="capitalize flex-1 flex justify-center items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700  data-[state=on]:bg-violet-600 data-[state=on]:text-violet-200 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4"
                value={'weekly'}
              >
                Semanal
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="capitalize flex-1 flex justify-center items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700  data-[state=on]:bg-violet-600 data-[state=on]:text-violet-200 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4"
                value={'monthly'}
              >
                Mensal
              </ToggleGroup.Item>
            </ToggleGroup.Root>
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Categorias</h2>
              <ToggleGroup.Root
                type="single"
                value={category}
                className="flex flex-wrap gap-3 justify-between"
                onValueChange={value => {
                  if (value) setCategory(value)
                }}
              >
                {categories.userCategories.map(item => {
                  return (
                    <ToggleGroup.Item
                      className="capitalize flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700  data-[state=on]:bg-violet-600 data-[state=on]:text-violet-200 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4"
                      value={item.id}
                      key={item.id}
                    >
                      {item.name}
                    </ToggleGroup.Item>
                  )
                })}
                <ToggleGroup.Item
                  className="capitalize flex-1 flex justify-center items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700  data-[state=on]:bg-violet-600 data-[state=on]:text-violet-200 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4"
                  value={'uncategorized-id'}
                >
                  Sem categoria
                </ToggleGroup.Item>
                {/* <CreateCategoryForm /> */}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                Quantas vezes na semana?
              </Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={2}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      value={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      {Array.from({ length: numberOfOptions }).map((_, i) => {
                        const frequency = String(i + 1)
                        const emojiList =
                          type === 'weekly' ? emojiListWeek : emojiListMonth
                        const emoji = emojiList[i % emojiList.length]

                        return (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <RadioGroupItem key={i} value={frequency}>
                            <RadioGroupIndicator />
                            <span className="text-zinc-300 text-sm font-medium leading-none">
                              {frequency}x{' '}
                              {type === 'weekly' ? 'na semana' : 'no mês'}
                            </span>
                            <span className="text-lg leading-none">
                              {emoji}
                            </span>
                          </RadioGroupItem>
                        )
                      })}
                    </RadioGroup>
                  )
                }}
              />
            </div>
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
  )
}
