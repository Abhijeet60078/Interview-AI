import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Trash2, Download, Eye } from "lucide-react";

const ResumeManager = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Software_Engineer_Resume.pdf",
      uploadedDate: "2024-02-15",
      size: "245 KB",
      primary: true,
    },
    {
      id: 2,
      name: "Backend_Developer_Resume.pdf",
      uploadedDate: "2024-02-10",
      size: "198 KB",
      primary: false,
    },
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const newResume = {
        id: Date.now(),
        name: file.name,
        uploadedDate: new Date().toISOString().split("T")[0],
        size: `${(file.size / 1024).toFixed(0)} KB`,
        primary: false,
      };
      setResumes([newResume, ...resumes]);
    }
  };

  const setPrimaryResume = (id) => {
    setResumes(
      resumes.map((r) => ({
        ...r,
        primary: r.id === id,
      }))
    );
  };

  const deleteResume = (id) => {
    setResumes(resumes.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileUp className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Resume Manager</h1>
            </div>
            <p className="text-muted-foreground">
              Upload and manage your resumes for different job applications
            </p>
          </div>

          {/* Upload Area */}
          <Card
            className={`glass-card border-2 border-dashed cursor-pointer transition-all ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-white/[0.08] hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardContent className="pt-12 pb-12 text-center">
              <FileUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Drop your resume here</h3>
              <p className="text-muted-foreground mb-4">or</p>
              <Button className="mb-2">
                <FileUp className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </CardContent>
          </Card>

          {/* Resumes List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Resumes</h2>

            {resumes.length === 0 ? (
              <Card className="glass-card border-white/[0.08]">
                <CardContent className="pt-12 pb-12 text-center text-muted-foreground">
                  <p>No resumes uploaded yet. Upload one to get started.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="glass-card border-white/[0.08] hover:border-white/[0.2] transition-all"
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{resume.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            Uploaded {resume.uploadedDate} • {resume.size}
                          </p>
                        </div>

                        {resume.primary && (
                          <span className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">
                            Primary
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </Button>

                          {!resume.primary && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setPrimaryResume(resume.id)}
                              title="Set as primary"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              ⭐
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteResume(resume.id)}
                            title="Delete"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <Card className="glass-card border-white/[0.08] mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Resume Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                ✓ <strong>Keep it concise:</strong> Limit to 1-2 pages
              </p>
              <p>
                ✓ <strong>Highlight achievements:</strong> Focus on impact and results
              </p>
              <p>
                ✓ <strong>Use keywords:</strong> Include relevant technical terms
              </p>
              <p>
                ✓ <strong>Tailor for roles:</strong> Upload different versions for different roles
              </p>
              <p>
                ✓ <strong>Use your primary resume:</strong> This will be shared in interviews
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeManager;
