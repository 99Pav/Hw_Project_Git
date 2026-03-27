import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const Teachers = () => {
  const { data: teachers, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teachers").select("*");
      if (error) throw error;
      return data;
    },
  });

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent/10 p-2 text-accent">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Teachers</h1>
            <p className="text-sm text-muted-foreground">All registered teachers in the system</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-[var(--shadow-card)]">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : !teachers?.length ? (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p className="font-medium">No teachers yet</p>
              <p className="mt-1 text-sm">Add your first teacher to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-display font-semibold">University</TableHead>
                  <TableHead className="font-display font-semibold">Department</TableHead>
                  <TableHead className="font-display font-semibold">Gender</TableHead>
                  <TableHead className="font-display font-semibold">Year Joined</TableHead>
                  <TableHead className="font-display font-semibold">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher, i) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{teacher.university_name}</TableCell>
                    <TableCell>{teacher.department || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {teacher.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>{teacher.year_joined}</TableCell>
                    <TableCell className="text-muted-foreground">{teacher.phone || "—"}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Teachers;
