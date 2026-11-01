Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft David Desktop")
$synth.Rate = 1  # Natural normal conversational speed

$outFile = Join-Path $PSScriptRoot "..\frontend\public\narration.wav"
$synth.SetOutputToWaveFile($outFile)

$p = New-Object System.Speech.Synthesis.PromptBuilder

# Scene 1: The Problem (0s to ~22.5s)
$p.AppendText("Welcome to TraceBack AI, an autonomous enterprise spend recovery platform.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("Modern organizations lose between 1.5% and 4% of procurement spend to uncaptured overcharges because critical data is fragmented across ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("TraceBack AI stops this financial leakage in real time.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 2: Live PO-1001 Audit (~22.5s to ~57.5s)
$p.AppendText("In this live audit of Purchase Order PO-1001, TraceBack AI discovers $1,200 in overcharges in 184 milliseconds.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("First: quantity overbilling. The supplier billed for 120 units, but warehouse dock note DN-045 logged only 100 units physically received: a $1,000 loss.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Second: contract rate escalation. The invoice charged $50 per unit, breaching our $48 master contract ceiling: adding $200 in rate creep.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Every finding carries an immutable evidence link down to the exact file, row, and column.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 3: MANDATORY ZETARIS DEMO CHALLENGE PERSONAL INSIGHT (54.3s - STRICTLY 40-60s)
$p.AppendText("This brings us to Zetaris Data Virtualization, submitted as part of the Zetaris Demo Challenge.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("When building TraceBack AI, our biggest hurdle was data fragmentation: how do you reconcile four disconnected enterprise silos without spending six months building a brittle ETL lakehouse?")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("That was the moment Zetaris clicked for us.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("Zetaris acted as our decentralized data harness, allowing our agent to run federated SQL joins across live ERP tables, warehouse receipts, invoices, and contracts in place.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("What surprised us most was the speed: federated queries executing in just 12 milliseconds with zero data movement.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Crucially, Zetaris enabled 100% cell-level audit defensibility: every claim cites raw file, row, and column coordinates with zero AI hallucinations.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("In one sentence: Zetaris eliminated the data engineering bottleneck, giving our autonomous agent instant access to fragmented enterprise reality.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 4: Meterless Engine & Nightshift AI (~111.8s to ~136.6s)
$p.AppendText("The agent orchestration is powered by Meterless architecture.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Scout Intent sets tolerances, Relay dispatches Zetaris queries, and reconciliation algorithms compute exact variances.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("For reasoning, Meterless Nightshift acts as our private AI provider, running a four-stage Race, Judge, Verify, and Generate cycle on local compute at zero dollar cloud token cost, committing all state to Gaia memory.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 5: Human Approval & Benchmark (~136.6s to ~159.0s)
$p.AppendText("With one click, the lead auditor approves the $1,200 recovery claim, and TraceBack AI synthesizes a formal supplier dispute letter citing every dock note and contract section.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Meanwhile, testing clean order PO-1002 returns zero overcharges and zero false alarms with 100% concordance.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("TraceBack AI turns procurement leakage into immediate cash recovery.")

$synth.Speak($p)
$synth.Dispose()

$bytes = [System.IO.File]::ReadAllBytes($outFile)
$byteRate = [BitConverter]::ToUInt32($bytes, 28)
$duration = ($bytes.Length - 44) / $byteRate
Write-Host "SUCCESS! Generated narration.wav with duration: $([Math]::Round($duration, 2)) seconds"
