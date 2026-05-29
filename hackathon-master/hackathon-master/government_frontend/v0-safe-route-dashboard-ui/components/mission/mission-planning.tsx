"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Route,
  Users,
  Target,
  Waves,
  Car,
  Ship,
  Plane,
} from "lucide-react";

type AccessType =
  | "road"
  | "boat"
  | "air";

interface RescueTeam {
  id: string;
  name: string;
  type: string;
  members: number;
  location: string;
  status: string;
}

interface MissionPlanningProps {
  rescueTeams?: RescueTeam[];
}

interface MissionPlan {
  zone: null;
  selectedTeams: string[];
  accessType: AccessType;
  feasibility:
    | "feasible"
    | "risky"
    | "not-recommended";
  riskLevel:
    | "low"
    | "medium"
    | "high";
  estimatedLives: number;
}

const accessTypeConfig: Record<
  AccessType,
  {
    label: string;
    icon: typeof Car;
    description: string;
  }
> = {
  road: {
    label: "Road Access",
    icon: Car,
    description:
      "Ground vehicles and personnel",
  },

  boat: {
    label: "Boat Access",
    icon: Ship,
    description:
      "Water vessels for flooded areas",
  },

  air: {
    label: "Air Support",
    icon: Plane,
    description:
      "Helicopters for critical evacuations",
  },
};

export function MissionPlanning({
  rescueTeams = [],
}: MissionPlanningProps) {
  const [
    selectedTeams,
    setSelectedTeams,
  ] = useState<string[]>([]);

  const [accessType, setAccessType] =
    useState<AccessType>("road");

  const [missionPlan, setMissionPlan] =
    useState<MissionPlan | null>(
      null
    );

  const handleTeamToggle = (
    teamId: string
  ) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter(
            (id) =>
              id !== teamId
          )
        : [...prev, teamId]
    );
  };

  const deployedTeams =
    rescueTeams.filter(
      (t) =>
        t.status ===
        "deployed"
    );

  const availableTeams =
    rescueTeams.filter(
      (t) =>
        t.status !==
        "deployed"
    );

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Missions
                </p>

                <p className="text-3xl font-bold text-foreground">
                  {
                    deployedTeams.length
                  }
                </p>
              </div>

              <div className="rounded-full bg-status-warning/20 p-3">
                <Route className="h-6 w-6 text-status-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Teams Available
                </p>

                <p className="text-3xl font-bold text-status-stable">
                  {
                    availableTeams.length
                  }
                </p>
              </div>

              <div className="rounded-full bg-status-stable/20 p-3">
                <Users className="h-6 w-6 text-status-stable" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Priority Zones
                </p>

                <p className="text-3xl font-bold text-status-critical">
                  0
                </p>
              </div>

              <div className="rounded-full bg-status-critical/20 p-3">
                <Target className="h-6 w-6 text-status-critical" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mission Config */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Route className="h-5 w-5 text-primary" />
              Plan New Mission
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Priority Zones */}
            <div className="space-y-3">
              <Label className="font-medium text-foreground">
                Priority Zones
              </Label>

              <div className="rounded-lg border border-border bg-secondary p-6 text-center text-muted-foreground">
                No priority zones
                available
              </div>
            </div>

            <Separator />

            {/* Teams */}
            <div className="space-y-3">
              <Label className="font-medium text-foreground">
                Rescue Teams
              </Label>

              <ScrollArea className="h-48">
                <div className="space-y-2 pr-4">
                  {availableTeams.length ===
                  0 ? (
                    <div className="rounded-lg border border-border bg-secondary p-6 text-center text-muted-foreground">
                      No rescue teams
                      available
                    </div>
                  ) : (
                    availableTeams.map(
                      (team) => (
                        <div
                          key={
                            team.id
                          }
                          className="flex items-center justify-between rounded-lg border border-border bg-secondary p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedTeams.includes(
                                team.id
                              )}
                              onCheckedChange={() =>
                                handleTeamToggle(
                                  team.id
                                )
                              }
                            />

                            <div>
                              <p className="font-medium text-foreground">
                                {
                                  team.name
                                }
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {
                                  team.members
                                }{" "}
                                members
                              </p>
                            </div>
                          </div>

                          <Badge variant="outline">
                            {
                              team.status
                            }
                          </Badge>
                        </div>
                      )
                    )
                  )}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* Access Type */}
            <div className="space-y-3">
              <Label className="font-medium text-foreground">
                Access Type
              </Label>

              <div className="grid grid-cols-3 gap-3">
                {(
                  Object.keys(
                    accessTypeConfig
                  ) as AccessType[]
                ).map((type) => {
                  const config =
                    accessTypeConfig[
                      type
                    ];

                  const Icon =
                    config.icon;

                  return (
                    <button
                      key={type}
                      onClick={() =>
                        setAccessType(
                          type
                        )
                      }
                      className={`rounded-lg border p-4 ${
                        accessType ===
                        type
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon className="h-6 w-6" />

                        <span className="text-sm font-medium text-foreground">
                          {
                            config.label
                          }
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled
            >
              Generate Mission
              Plan
            </Button>
          </CardContent>
        </Card>

        {/* Mission Assessment */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Mission Assessment
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Waves className="mb-4 h-12 w-12 text-muted-foreground/50" />

              <p className="text-muted-foreground">
                No mission
                assessment
                available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}