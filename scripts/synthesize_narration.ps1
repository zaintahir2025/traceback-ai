Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft David Desktop")
$synth.Rate = 5  # Crisp, energetic presentation pace

$outFile = Join-Path $PSScriptRoot "..\frontend\public\narration.wav"
$synth.SetOutputToWaveFile($outFile)

$text = @"
Welcome to TraceBack AI.
In global supply chains, enterprises lose 1.5% to 4% of total procurement spend to uncaptured invoice overcharges.
Data fragmentation is the root cause: purchase orders live in ERP systems, warehouse delivery receipts live in WMS, supplier invoices arrive in accounts payable, and contract prices sit in legal agreements.
TraceBack AI solves this by unifying all four sources into an autonomous agent that detects discrepancies in real time with an immutable evidence trail.

Let's examine a live audit of Purchase Order PO-1001 with supplier SUP-42.
In under 200 milliseconds, TraceBack AI discovers $1,200 in recoverable overcharges with 96.5% confidence.
First: quantity overbilling. The supplier billed for 120 units, but warehouse receiving note DN-045 logged only 100 units physically delivered.
That is 20 unreceived units billed at $50 each: a direct $1,000 loss.
Second: contract rate escalation. The invoice charged $50 per unit versus our contracted rate of $48.
That is an unauthorized $2 markup on 100 delivered units, adding $200 in rate leakage.
Every finding cites the exact CSV file, row, and column.

How does TraceBack AI achieve this without brittle ETL pipelines?
Through Zetaris data virtualization.
TraceBack AI executes federated SQL joins across purchase orders, deliveries, invoices, and contracts on the fly.
Data remains in place with zero pipeline latency.
Every finding carries an immutable evidence trail linking to the exact cell. Clicking an evidence chip opens the raw data row instantly.

TraceBack AI is orchestrated with Meterless Agent architecture.
Scout Intent establishes audit rules; Relay coordinates Zetaris queries; and reconciliation algorithms quantify financial exposure.
Meterless Nightshift acts as our autonomous AI provider, executing a four-stage Race, Judge, Verify, and Generate cycle on local compute, producing an immutable audit receipt at zero dollar cloud token cost.
The entire mission is committed to Meterless Gaia H-MEM memory.

TraceBack AI keeps a human in the loop.
The lead auditor approves the $1,200 claim with one click, and the system synthesizes a professional supplier dispute letter citing all delivery notes and contract clauses.
Testing clean order PO-1002 returns zero overcharges with 100% concordance.
TraceBack AI turns procurement leakage into measurable cash recovery in seconds.
"@

$synth.Speak($text)
$synth.Dispose()
Write-Host "Narration synthesized successfully to $outFile"
