"use client";

import { useState, useEffect, useRef } from "react";
import {
  Activity,
  RotateCcw,
  Play,
  Pause,
  Info,
  Zap,
  Target,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function PidTunerPage() {
  const [kp, setKp] = useState(1.5);
  const [ki, setKi] = useState(0.5);
  const [kd, setKd] = useState(0.1);
  const [setpoint, setSetpoint] = useState(50);
  const [isRunning, setIsRunning] = useState(true);
  const [history, setHistory] = useState<
    { time: number; value: number; setpoint: number }[]
  >([]);
  const [currentState, setCurrentState] = useState(0);

  const stateRef = useRef({
    currentValue: 0,
    integral: 0,
    lastError: 0,
    velocity: 0,
    time: 0,
  });

  const resetSimulation = () => {
    stateRef.current = {
      currentValue: 0,
      integral: 0,
      lastError: 0,
      velocity: 0,
      time: 0,
    };
    setHistory([]);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const { currentValue, integral, lastError, velocity, time } =
        stateRef.current;

      const error = setpoint - currentValue;
      const newIntegral = integral + error * 0.1;
      const derivative = (error - lastError) / 0.1;

      const output = kp * error + ki * newIntegral + kd * derivative;

      // Simple physical system simulation (e.g., mass with inertia and friction)
      const acceleration = output - 0.5 * velocity; // simple friction
      const newVelocity = velocity + acceleration * 0.1;
      const newValue = currentValue + newVelocity * 0.1;

      stateRef.current = {
        currentValue: newValue,
        integral: newIntegral,
        lastError: error,
        velocity: newVelocity,
        time: time + 0.1,
      };
      setCurrentState(newValue);

      setHistory((prev) => {
        const next = [
          ...prev,
          { time: time, value: newValue, setpoint: setpoint },
        ];
        if (next.length > 100) return next.slice(1);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, kp, ki, kd, setpoint]);

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools" },
            {
              label: "PID Controller Tuner",
              href: "/tools/pid-tuner",
              active: true,
            },
          ]}
          className="mb-8"
        />
        <div className="mb-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                <Activity className="h-8 w-8 text-teal-500" />
                PID Controller Tuner
              </h1>
              <p className="mt-2 text-muted-foreground">
                Real-time Proportional-Integral-Derivative simulation for
                control systems analysis.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
                className="gap-2"
              >
                {isRunning ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isRunning ? "Pause" : "Resume"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetSimulation}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Controls */}
          <Card className="lg:col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" /> Proportional
                    (Kp)
                  </label>
                  <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                    {kp.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[kp]}
                  min={0}
                  max={5}
                  step={0.01}
                  onValueChange={([v]) => setKp(v)}
                />
                <p className="text-[10px] text-muted-foreground">
                  Adjusts current error response. High values may cause
                  instability.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" /> Integral (Ki)
                  </label>
                  <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                    {ki.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[ki]}
                  min={0}
                  max={2}
                  step={0.01}
                  onValueChange={([v]) => setKi(v)}
                />
                <p className="text-[10px] text-muted-foreground">
                  Eliminates steady-state error. Too high causes oscillation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-purple-500" /> Derivative
                    (Kd)
                  </label>
                  <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                    {kd.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[kd]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={([v]) => setKd(v)}
                />
                <p className="text-[10px] text-muted-foreground">
                  Predicts future error. Dampens the system response.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Setpoint</label>
                  <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                    {setpoint}
                  </span>
                </div>
                <Slider
                  value={[setpoint]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([v]) => setSetpoint(v)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={history}
                      margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(20, 184, 166)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="rgb(20, 184, 166)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255, 255, 255, 0.05)"
                        vertical={false}
                      />
                      <XAxis dataKey="time" hide />
                      <YAxis
                        domain={[-10, 110]}
                        stroke="rgba(255, 255, 255, 0.5)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                        itemStyle={{ fontSize: "12px" }}
                        labelStyle={{ display: "none" }}
                        isAnimationActive={false}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        wrapperStyle={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "12px",
                          fontFamily: "var(--font-google-sans)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        name="Current Value"
                        stroke="rgb(20, 184, 166)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="setpoint"
                        name="Setpoint"
                        stroke="rgba(255, 99, 132, 0.5)"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-teal-500/20 bg-teal-500/5">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-teal-500/10 p-2 text-teal-500">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Current State
                    </p>
                    <p className="text-2xl font-bold font-mono">
                      {currentState.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Error
                    </p>
                    <p className="text-2xl font-bold font-mono">
                      {(setpoint - currentState).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <section className="mt-16 rounded-2xl border border-primary/10 bg-primary/5 p-8">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Engineering Insight: The PID Algorithm
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed">
            <p className="mb-4">
              A PID controller continuously calculates an{" "}
              <strong>error value</strong> $e(t)$ as the difference between a
              desired setpoint (SP) and a measured process variable (PV). It
              applies a correction based on proportional, integral, and
              derivative terms:
            </p>
            <div className="bg-background/50 p-4 rounded-lg font-mono text-center mb-4">
              {
                "$u(t) = K_p e(t) + K_i \\int_0^t e(\\tau) d\\tau + K_d \\frac{de(t)}{dt}$"
              }
            </div>
            <ul className="grid gap-4 md:grid-cols-3 list-none p-0">
              <li className="bg-card p-4 rounded-lg border border-border">
                <strong>Proportional (Kp)</strong>: Corrects based on current
                error. High gain reduces rise time but can cause overshoot.
              </li>
              <li className="bg-card p-4 rounded-lg border border-border">
                <strong>Integral (Ki)</strong>: Corrects based on past errors.
                Accumulates error over time to eliminate offset.
              </li>
              <li className="bg-card p-4 rounded-lg border border-border">
                <strong>Derivative (Kd)</strong>: Corrects based on error rate.
                Acts as a damper to prevent overshoot and improve stability.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}