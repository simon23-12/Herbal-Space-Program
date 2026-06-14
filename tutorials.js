/* =================================================================
   HERBAL SPACE PROGRAM – Interactive Tutorials
   Each tutorial drops the player into a prepared scenario.
   scenario.stack  = pre-built rocket (top → bottom)
   scenario.orbit  = start directly in orbit {body, alt}
   (without orbit: start on the pad)
   steps: {text, check} – check(o, F) auto-completes the step
   (o = Flight.orbit(), F = Flight). Without check: "Next" button.
   ================================================================= */
const TUTORIALS = [
  {id:"first", icon:"🚀", title:"Your first launch", sub:"Pre-built rocket – ignite, climb, land.",
   scenario:{stack:["chute","pod","tankS","engS"]},
   steps:[
    {text:`Your first rocket is ready on the pad: parachute, command pod, tank, engine.<br><br>
      Ignite the first stage with the <b>[Space bar]</b>!`,
     check:(o,F)=>!F.landed && F.flew},
    {text:`Liftoff! 🔥 The rocket climbs straight up. On the left you see altitude and speed,
      bottom left thrust and fuel.<br><br>Climb to <b>5 km altitude</b>!`,
     check:o=>o.alt>5000},
    {text:`5 km! 🏆 The tank will be empty soon and the rocket falls back.<br><br>
      Wait until it is <b>falling</b> again (speed points downward), then open the
      parachute with <b>[P]</b>.`,
     check:(o,F)=>F.chuteOpen},
    {text:`Parachute open! 🪂 Now you float down at ~7 m/s.
      Below 8 m/s impact the landing is safe.<br><br>Wait for touchdown …`,
     check:(o,F)=>F.landed && F.flew}
   ],
   done:`Safely landed! 🛬 You've mastered launch, climb and parachute.
     Next step: the <b>Reaching Orbit</b> tutorial!`},

  {id:"orbit", icon:"🛰️", title:"Reaching orbit", sub:"A two-stage rocket is ready – fly the gravity turn.",
   scenario:{stack:["chute","pod","shield","rcs","tankM","engVac","decoupler","tankL","tankL","engMain"]},
   steps:[
    {text:`This two-stage rocket has enough Δv for orbit (~3400 m/s) – and a
      <b>heat shield</b> under the pod for the return!<br><br>
      An orbit means: <b>fly sideways so fast</b> that as you fall you keep
      missing the planet!<br><br>Ignite with <b>[Space]</b> and climb straight up.`,
     check:(o,F)=>!F.landed && F.flew},
    {text:`Now the <b>gravity turn</b>: slowly tilt the rocket east with <b>[D]</b>
      (navball: heading 90°).<br><br>Rule of thumb: 10 km → 20° tilt, 30 km → 60°.<br>
      When stage 1 is empty: <b>[Space]</b> separates and ignites stage 2.<br><br>
      First climb above <b>20 km</b>.`,
     check:o=>o.alt>20000},
    {text:`Open the map with <b>[M]</b>: the blue <b>Ap</b> marker is the highest point
      of your trajectory.<br><br>Keep burning eastward until <b>Ap is above 75 km</b> –
      then cut the engine with <b>[X]</b>.`,
     check:o=>o.ap>75000},
    {text:`Perfect! Now the decisive trick:<br><br>
      ⏩ Use <b>[.]</b> to warp time until you are just short of Ap (altitude ≈ apoapsis).<br>
      Then <b>[T]</b> for SAS PROGRADE and full throttle <b>[Z]</b> –
      burn until the <b>periapsis rises above 70 km</b>!`,
     check:o=>o.pe>70000},
   ],
   done:`YOU ARE IN ORBIT! 🎉 You now circle forever without fuel.
     Way home: SAS retrograde, burn until Pe < 35 km – your <b>heat shield</b> survives
     the fire of reentry (without it: 💥!), then parachute [P].`},

  {id:"node", icon:"◆", title:"Maneuver node: trip to Basil", sub:"You start directly in orbit – plan the transfer.",
   scenario:{stack:["chute","pod","rcs","tankM","tankM","engVac"], orbit:{body:"HERBIN", alt:80000}},
   steps:[
    {text:`You are already in an 80 km orbit – with full tanks (~2600 m/s Δv).
      Goal: the moon <b>Basil</b>!<br><br>First open the map with <b>[M]</b>.`,
     check:(o,F)=>F.map},
    {text:`Create a maneuver node on your orbit with <b>[K]</b>.`,
     check:(o,F)=>!!F.node},
    {text:`In the panel on the right: click <b>Prograde</b> +10 until about <b>+860 m/s</b>
      is set. Watch how the <b>green planned trajectory</b> grows – it has to reach all the
      way to Basil's orbit!`,
     check:(o,F)=>F.node && F.node.pro>=800},
    {text:`The green orbit crosses Basil's orbit – but does it hit Basil? Shift the
      <b>time</b> (±60s buttons) until the green orbit passes close by Basil.<br><br>
      Then: <b>[T]</b> several times until "SAS: point at maneuver node" – and ignite at
      <b>T minus half the burn time</b> (shown in the panel) with <b>[Z]</b>.
      Burn for roughly the stated duration until your real orbit (orange) matches the green one
      (Ap > 11,000 km).`,
     check:o=>o.ap<0 || o.ap>1.1e7},
    {text:`Transfer orbit set! 🚀 Cut the engine with <b>[X]</b>.<br><br>
      Now patience at high speed: time warp <b>[.]</b> up to 1000× and watch
      yourself fly to Basil (takes a few seconds of real time).`,
     check:o=>o.body && o.body.name==="Basil"},
   ],
   done:`Welcome to Basil's sphere of influence! 🌗 Bonus task: at your lowest point burn
     RETROGRADE until Ap drops below Basil's SOI – then you are captured (Basil orbit)!`},

  {id:"sat", icon:"📡", title:"Deploy a satellite", sub:"You start in orbit – with a satellite under the fairing.",
   scenario:{stack:["antenna","solar","battery","probe","fairing","pod","rcs","solar","tankM","engVac"], orbit:{body:"HERBIN", alt:90000}},
   steps:[
    {text:`You are in a 90 km orbit. At the tip of your rocket sits a complete satellite
      (antenna + solar + probe core) under a white <b>payload fairing</b>.<br><br>
      In vacuum the fairing is no longer needed: jettison it with <b>[F]</b>!`,
     check:(o,F)=>!F.v.fairingIntact},
    {text:`There's the satellite! ✨<br><br>
      Now deploy it with <b>[N]</b>.`,
     check:(o,F)=>F.sats.length>0},
    {text:`📡 The satellite now flies on by itself!<br><br>
      Important for your own missions: probes need <b>power</b> (⚡ bar bottom left).
      Deploy the solar panels with <b>[G]</b> – but only in vacuum, in airflow they tear off!`,
     check:(o,F)=>F.panelsOut},
    {text:`☀️ The panels charge the battery (+3 ⚡/s). Now also open the map <b>[M]</b>:
      your satellite appears as a green dot on its orbit.`,
     check:(o,F)=>F.map},
   ],
   done:`Mission complete! In career this gives you the "First satellite" mission (+30 🧪).
     Pro goal: a satellite in orbit around Basil or Minty!`},

  {id:"land", icon:"🛬", title:"Moon landing on Basil", sub:"You start in low Basil orbit – set the lander down.",
   scenario:{stack:["pod","rcs","tankM","engVac","legs"], orbit:{body:"BASIL", alt:15000}},
   steps:[
    {text:`You orbit Basil at 15 km altitude. Your lander has landing legs (forgive up to 12 m/s)
      – but Basil has <b>no atmosphere</b>: no parachute, only engine braking!<br><br>
      Set SAS to <b>RETROGRADE</b> with <b>[T]</b> and burn with <b>[Z]</b>
      until the periapsis drops <b>below 0</b> (trajectory points into the ground).`,
     check:o=>o.pe<0},
    {text:`You are now falling toward Basil. Keep SAS on retrograde – that way you always
      brake exactly against the fall direction.<br><br>Rule of thumb: fall above 2000 m,
      then brake hard. Descend below <b>5000 m</b> altitude.`,
     check:o=>o.alt<5000},
    {text:`Final phase! 🔥 Burn so the speed stays small as you sink:<br>
      at 1000 m → under 100 m/s · at 200 m → under 20 m/s · touchdown → <b>under 12 m/s</b>.<br><br>
      Fine-tune with <b>[↑/↓]</b>. You can do it!`,
     check:(o,F)=>F.landed},
   ],
   done:`THE EAGLE HAS LANDED! 🦅 Moon landing mastered – the ultimate challenge.
     (Crashed? <b>↩ Restart</b> resets the scenario.)`},

  {id:"reentry", icon:"🔥", title:"Survive reentry", sub:"Separate the stage, point the shield, pull the chute.",
   scenario:{stack:["chute","pod","shield","rcs","decoupler","tankM","engVac"], orbit:{body:"HERBIN", alt:75000, pe:28000}},
   steps:[
    {text:`Return from orbit! Your trajectory already dips into the atmosphere
      (periapsis 28 km – check the map <b>[M]</b>).<br><br>
      You no longer need the spent propulsion stage – and it has no
      heat protection. <b>Separate it with [Space]!</b>`,
     check:(o,F)=>F.v.segs.length===1},
    {text:`Now you are just pod + heat shield + parachute. 👍<br><br>
      The <b>heat shield points down</b> – so the pod must point <b>against the
      direction of travel</b>: press <b>[T]</b> until <b>SAS: RETROGRADE</b>.`,
     check:(o,F)=>F.sas==="retro"},
    {text:`Perfectly aligned! Now wait for the atmosphere (time warp <b>[.]</b>,
      [,] to slow down if needed).<br><br>
      It's about to get hot: the shield glows, the plasma lights up – but it holds.
      Ride out the fire until you are below <b>30 km</b> and slower than
      <b>1200 m/s</b>!`,
     check:o=>o.alt<30000 && o.speed<1200},
    {text:`Made it – the worst is over! 🔥➡️💨<br><br>
      The air keeps slowing you down. Below <b>5 km altitude</b>: parachute with <b>[P]</b>!`,
     check:(o,F)=>F.chuteOpen},
    {text:`🪂 Float gently… wait for touchdown.`,
     check:(o,F)=>F.landed},
   ],
   done:`Reentry mastered! 🏅 Remember: <b>drop the stage → retrograde with
     heat shield first → parachute below 5 km</b>. Without a shield = 💥, without
     retrograde alignment you risk the crew. Now you're ready for real orbital missions!`},

  {id:"burns", icon:"🧭", title:"Understanding burns & SAS", sub:"Prograde, retrograde & co. – the language of spaceflight.",
   scenario:{stack:["chute","pod","shield","rcs","tankM","tankM","engVac"], orbit:{body:"HERBIN", alt:100000}},
   steps:[
    {text:`You are in a 100 km orbit. On the <b>navball</b> you see the green symbol:
      that is <b>PROGRADE</b> – the direction you are currently flying.<br><br>
      Mnemonic: <b>burn prograde = go faster = orbit gets BIGGER</b>
      (on the opposite side!).<br><br>
      Press <b>[T]</b> until SAS: PROGRADE is active.`,
     check:(o,F)=>F.sas==="pro"},
    {text:`SAS now keeps the nose on prograde automatically. 🎯<br><br>
      Give full throttle <b>[Z]</b> and watch the <b>apoapsis</b> on the left:
      it grows – but not here, on the OPPOSITE side of your orbit!
      (Map [M] shows it live.)<br><br>
      Burn until <b>Ap is above 200 km</b>, then cut the engine [X].`,
     check:o=>o.ap>200000},
    {text:`Now the opposite: <b>RETROGRADE</b> = burn against the direction of travel
      = go slower = <b>orbit gets SMALLER</b>.<br><br>
      Press <b>[T]</b> until SAS: RETROGRADE is active – the rocket turns 180°.`,
     check:(o,F)=>F.sas==="retro"},
    {text:`Full throttle <b>[Z]</b> – and watch the apoapsis shrink again!<br><br>
      Burn until <b>Ap is back below 130 km</b>, then [X].<br><br>
      💡 This is how EVERYTHING in spaceflight works: higher = prograde, lower = retrograde,
      always at the right point of the orbit.`,
     check:o=>o.ap>0 && o.ap<130000},
    {text:`The last two directions (for pros):<br><br>
      <b>NORMAL</b> (perpendicular to the orbital plane) tilts your inclination –
      important for Minty's inclined orbit.<br>
      <b>RADIAL</b> (toward/away from the planet) rotates the orbit without changing its size much.<br><br>
      You set both at the <b>maneuver node [K]</b> – the sliders there have the same names!`},
   ],
   done:`You now speak spaceflight! 🧭 Prograde = bigger, retrograde = smaller,
     normal = inclination, radial = rotation. With [T] the SAS holds any direction automatically –
     and at the maneuver node the engine burns exactly the planned Δv.`},

  {id:"evatut", icon:"🧑‍🚀", title:"Spacewalk (EVA)", sub:"Step out, float, return safely.",
   scenario:{stack:["chute","pod","shield","rcs","tankM","engVac"], orbit:{body:"HERBIN", alt:120000}},
   steps:[
    {text:`You are in a 120 km orbit – time for the most famous moment of spaceflight:
      the <b>spacewalk</b>!<br><br>
      Open the hatch with <b>[V]</b>.`,
     check:(o,F)=>!!F.eva},
    {text:`There floats your pilot! 🧑‍🚀<br><br>
      The <b>jetpack</b> steers camera-relative: <b>W/S</b> = forward/back,
      <b>A/D</b> = left/right, <b>↑/↓</b> = up/down. The mouse rotates the camera.<br><br>
      Move at least <b>40 m</b> away from the ship (distance shown top right).`,
     check:(o,F)=>F.eva && F.eva.pos.distanceTo(F.pos)>40},
    {text:`Take a look at your ship from outside – and Herbin below you! 🌍<br><br>
      But careful: drift too far and you won't get back.
      Fly <b>back to the ship</b> now (under 60 m) and board again with <b>[V]</b>.`,
     check:(o,F)=>!F.eva},
   ],
   done:`Safely back on board! 🛰️ Remember: in orbit the astronaut moves at the
     same orbital speed as the ship – small jetpack nudges are enough.
     EVA only works with crew (command pod) and only in space.`},

  {id:"science", icon:"🔬", title:"Collecting science", sub:"You start in orbit with a lab on board.",
   scenario:{stack:["chute","pod","lab","rcs","tankM","engVac"], orbit:{body:"HERBIN", alt:100000}},
   steps:[
    {text:`Your ship has a <b>Materials Lab »Curie«</b> on board (the module with the
      glowing windows). You are in near space above Herbin.<br><br>
      Run an experiment: <b>[B]</b>!`,
     check:(o,F)=>F.expCount>0},
    {text:`🔬 In career mode every <b>new location</b> gives science once:
      atmosphere (6) · near space (12) · high orbit (15) · near Basil (20) ·
      on Basil (30) · near Minty (25) · on Minty (40).<br><br>
      Climb to a higher orbit: burn PROGRADE (SAS [T] helps) until the
      <b>apoapsis is above 250 km</b>, warp time up to there – that would be the
      next new research location! Burn now until <b>Ap > 250 km</b>.`,
     check:o=>o.ap>250000},
    {text:`Use time warp <b>[.]</b> until you are above <b>250 km altitude</b>
      (= new location "high orbit"), then press <b>[B]</b> again.`,
     check:(o,F)=>F.expCount>1},
   ],
   done:`That's how research works! 🧪 In career mode you spend the points under
     <b>Research</b> to unlock new parts. Tip: take the lab on EVERY mission.`}
];
