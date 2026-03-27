import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, GraduationCap, Building2, CalendarDays } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teachers").select("*");
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    {
      title: "Total Teachers",
      value: teachers?.length ?? 0,
      icon: Users,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Universities",
      value: new Set(teachers?.map((t) => t.university_name)).size,
      icon: Building2,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Departments",
      value: new Set(teachers?.map((t) => t.department).filter(Boolean)).size,
      icon: GraduationCap,
      color: "bg-success/10 text-success",
    },
    {
      title: "Latest Join Year",
      value: teachers?.length ? Math.max(...teachers.map((t) => t.year_joined)) : "—",
      icon: CalendarDays,
      color: "bg-destructive/10 text-destructive",
    },
  ];

  const firstName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "User";

  return (
    <AppLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-accent">{firstName}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's an overview of your teacher database.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="border-border/50 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg p-2 ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="font-display text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
