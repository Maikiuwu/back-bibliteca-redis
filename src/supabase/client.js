import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

export const client = createClient(
    "https://rvjswwtifhdxgzlxipbo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2anN3d3RpZmhkeGd6bHhpcGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMzE0NjksImV4cCI6MjA3NDYwNzQ2OX0.MrIhE5DJu4q6u4JYSrZObFOzETz53ir2YHHqV6kFbQg"

);
