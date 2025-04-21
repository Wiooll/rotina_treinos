export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string
          description: string | null
          id: string
          muscle_group: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          muscle_group: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          muscle_group?: string
          name?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          clerk_id: string
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          clerk_id: string
          created_at?: string
          email: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          clerk_id?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
      }
      workout_exercise_logs: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          notes: string | null
          reps_completed: number
          sets_completed: number
          updated_at: string
          weight: number | null
          workout_log_id: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          id?: string
          notes?: string | null
          reps_completed: number
          sets_completed: number
          updated_at?: string
          weight?: number | null
          workout_log_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          notes?: string | null
          reps_completed?: number
          sets_completed?: number
          updated_at?: string
          weight?: number | null
          workout_log_id?: string
        }
      }
      workout_exercises: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          notes: string | null
          order_position: number
          reps: number
          rest_time: number | null
          sets: number
          updated_at: string
          weight: number | null
          workout_id: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          id?: string
          notes?: string | null
          order_position: number
          reps: number
          rest_time?: number | null
          sets: number
          updated_at?: string
          weight?: number | null
          workout_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          notes?: string | null
          order_position?: number
          reps?: number
          rest_time?: number | null
          sets?: number
          updated_at?: string
          weight?: number | null
          workout_id?: string
        }
      }
      workout_logs: {
        Row: {
          created_at: string
          finished_at: string | null
          id: string
          notes: string | null
          started_at: string
          updated_at: string
          user_id: string
          workout_id: string
        }
        Insert: {
          created_at?: string
          finished_at?: string | null
          id?: string
          notes?: string | null
          started_at: string
          updated_at?: string
          user_id: string
          workout_id: string
        }
        Update: {
          created_at?: string
          finished_at?: string | null
          id?: string
          notes?: string | null
          started_at?: string
          updated_at?: string
          user_id?: string
          workout_id?: string
        }
      }
      workouts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
  }
} 