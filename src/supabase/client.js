import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

export const client = createClient(
    "https://mpuzragtifrxkgunsefr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wdXpyYWd0aWZyeGtndW5zZWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODQ3MDIsImV4cCI6MjA3NDE2MDcwMn0.2QxoKyLetAa07BqpgpC4-LLZq5o3Bdh4gHmIeoxipCs"
);
