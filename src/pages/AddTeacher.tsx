import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight } from "lucide-react";

const AddTeacher = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [universityName, setUniversityName] = useState("");
  const [gender, setGender] = useState("");
  const [yearJoined, setYearJoined] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("teachers").insert({
      user_id: user.id,
      university_name: universityName,
      gender,
      year_joined: parseInt(yearJoined),
      department: department || null,
      phone: phone || null,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Teacher record added!");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate("/teachers");
    }
    setLoading(false);
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-accent/10 p-2 text-accent">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Add Teacher</h1>
            <p className="text-sm text-muted-foreground">Create a new teacher record</p>
          </div>
        </div>

        <Card className="border-border/50 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="font-display">Teacher Details</CardTitle>
            <CardDescription>
              This will be linked to your user account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="university">University Name *</Label>
                <Input
                  id="university"
                  placeholder="MIT, Stanford, Oxford..."
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearJoined">Year Joined *</Label>
                  <Input
                    id="yearJoined"
                    type="number"
                    placeholder="2020"
                    min={1950}
                    max={new Date().getFullYear()}
                    value={yearJoined}
                    onChange={(e) => setYearJoined(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="Computer Science, Mathematics..."
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !gender}
                className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {loading ? "Saving..." : "Add Teacher"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default AddTeacher;
