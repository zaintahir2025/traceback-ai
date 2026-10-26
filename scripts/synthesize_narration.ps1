Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft David Desktop")
$synth.Rate = 1  # Natural, normal conversational pace

$outFile = Join-Path $PSScriptRoot "..\frontend\public\narration.wav"
$synth.SetOutputToWaveFile($outFile)

$p = New-Object System.Speech.Synthesis.PromptBuilder

# Scene 1: The Problem (0s to ~23s)
$p.AppendText("Welcome to TraceBack AI.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(300))
$p.AppendText("Enterprises lose up to 4% of procurement spend to uncaptured invoice overcharges.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Data is siloed across ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("TraceBack AI unifies all four sources into an autonomous agent that stops spend leakage in real time.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 2: Live Audit PO-1001 (~23s to ~55s)
$p.AppendText("In a live audit of Purchase Order PO-1001, TraceBack AI discovers $1,200 in overcharges in 184 milliseconds.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(250))
$p.AppendText("First: quantity overbilling. Invoiced for 120 units, but warehouse dock note DN-045 logged only 100 received: a $1,000 loss.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Second: contract rate escalation. Invoiced at $50 per unit versus our $48 contract ceiling: adding $200 in rate creep.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Every finding links directly to the exact file, row, and column.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 3: Zetaris Data Virtualization (~55s to ~75s)
$p.AppendText("This is powered by Zetaris data virtualization.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("TraceBack AI executes federated SQL joins across all four data sources on the fly in 12 milliseconds.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Data stays in place with zero ETL pipelines, zero replication, and zero latency.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 4: Meterless Engine & Nightshift (~75s to ~95s)
$p.AppendText("The agent workflow is orchestrated with Meterless.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Scout Intent establishes audit rules, Relay coordinates queries, and Meterless Nightshift acts as our AI provider.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Nightshift runs a four-stage local reasoning cycle on local compute, producing an audit receipt at zero dollar cloud token cost, committed to Gaia memory.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(400))

# Scene 5: Governance & Benchmark (~95s to ~107s)
$p.AppendText("The lead auditor approves the claim with one click, and the system synthesizes a formal supplier dispute notice.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("Meanwhile, testing clean order PO-1002 returns zero overcharges and zero false alarms.")
$p.AppendBreak([TimeSpan]::FromMilliseconds(200))
$p.AppendText("TraceBack AI turns procurement leakage into measurable cash recovery.")

$synth.Speak($p)
$synth.Dispose()

Write-Host "Natural normal-speed narration synthesized successfully to $outFile"
