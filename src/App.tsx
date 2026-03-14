{\rtf1\ansi\ansicpg936\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\froman\fcharset0 TimesNewRomanPSMT;\f2\fnil\fcharset0 AppleColorEmoji;
}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab420
\pard\pardeftab420\ri720\qj\partightenfactor0

\f0\fs21 \cf0 import React, \{ useState \} from 'react';\
import \{ motion, AnimatePresence \} from 'motion/react';\
import \{ Heart, Send, X, Home, Backpack, Sparkles as SparklesIcon, Smile, ArrowLeft \} from 'lucide-react';\
import \{ GameState, EggyConfig, Trouble, POSITIVE_PHRASES \} from './types';\
import \{ Plaza \} from './components/Plaza';\
import \{ Eggy \} from './components/Eggy';\
import \{ Island \} from './components/Island';\
import \{ Canvas, useFrame \} from '@react-three/fiber';\
import \{ Stars, Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Sparkles, Cloud \} from '@react-three/drei';\
import \{ generateEncouragement \} from './services/gemini';\
import * as THREE from 'three';\
import confetti from 'canvas-confetti';\
\
const OrbitingPlanet = (\{ radius, speed, color, size, offset = 0 \}: \{ radius: number, speed: number, color: string, size: number, offset?: number \}) => \{\
  const ref = React.useRef<THREE.Group>(null);\
  useFrame((state) => \{\
    const t = state.clock.getElapsedTime() * speed + offset;\
    if (ref.current) \{\
      ref.current.position.set(\
        Math.cos(t) * radius,\
        Math.sin(t) * radius * 0.3,\
        Math.sin(t) * radius\
      );\
      // Add a bit of self-rotation\
      ref.current.rotation.y += 0.01;\
    \}\
  \});\
  return (\
    <group ref=\{ref\}>\
      <mesh>\
        <sphereGeometry args=\{[size, 16, 16]\} />\
        <meshStandardMaterial color=\{color\} emissive=\{color\} emissiveIntensity=\{1.5\} />\
      </mesh>\
      \{/* Small Planet Ring */\}\
      <mesh rotation=\{[Math.PI / 3, 0, 0]\}>\
        <torusGeometry args=\{[size * 1.8, 0.01, 8, 32]\} />\
        <meshBasicMaterial color="white" transparent opacity=\{0.4\} />\
      </mesh>\
    </group>\
  );\
\};\
\
const HeroPlanet = () => \{\
  return (\
    <group>\
      <Float speed=\{2\} rotationIntensity=\{1.5\} floatIntensity=\{2\}>\
        <mesh castShadow>\
          <sphereGeometry args=\{[1.0, 64, 64]\} />\
          <meshStandardMaterial \
            color="#FFB7B2" \
            emissive="#FFB7B2"\
            emissiveIntensity=\{1.2\}\
            roughness=\{0.1\}\
            metalness=\{0.5\}\
          />\
        </mesh>\
        \{/* Main Planet Ring */\}\
        <mesh rotation=\{[Math.PI / 2.5, 0, 0]\}>\
          <torusGeometry args=\{[1.6, 0.02, 16, 100]\} />\
          <meshStandardMaterial color="#B5EAD7" emissive="#B5EAD7" emissiveIntensity=\{2\} transparent opacity=\{0.6\} />\
        </mesh>\
        \{/* Glow Shell */\}\
        <Sphere args=\{[1.1, 32, 32]\}>\
          <meshBasicMaterial color="#FFDAC1" transparent opacity=\{0.4\} />\
        </Sphere>\
      </Float>\
      \
      \{/* Orbiting small planets */\}\
      <OrbitingPlanet radius=\{2.2\} speed=\{0.3\} color="#B5EAD7" size=\{0.2\} />\
      <OrbitingPlanet radius=\{2.8\} speed=\{0.2\} color="#E0BBE4" size=\{0.15\} offset=\{Math.PI\} />\
      <OrbitingPlanet radius=\{1.8\} speed=\{0.4\} color="#FFF9C4" size=\{0.12\} offset=\{1\} />\
      <OrbitingPlanet radius=\{3.5\} speed=\{0.1\} color="#C7CEEA" size=\{0.18\} offset=\{2\} />\
    </group>\
  );\
\};\
\
const ShootingStar = () => \{\
  return null;\
\};\
\
const CosmicScene = () => \{\
  return (\
    <>\
      <Stars radius=\{100\} depth=\{50\} count=\{3000\} factor=\{4\} saturation=\{1\} fade speed=\{0\} />\
      <Sparkles count=\{150\} scale=\{20\} size=\{2\} speed=\{0\} opacity=\{0.6\} color="#B5EAD7" />\
      <Sparkles count=\{80\} scale=\{30\} size=\{4\} speed=\{0\} opacity=\{0.4\} color="#FFB7B2" />\
      \
      \{/* Galaxies / Nebulae */\}\
      <Float speed=\{1.5\} rotationIntensity=\{1\} floatIntensity=\{1\}>\
        <Cloud opacity=\{0.15\} speed=\{0\} segments=\{25\} color="#B5EAD7" position=\{[-6, 3, -12]\} />\
        <Cloud opacity=\{0.15\} speed=\{0\} segments=\{25\} color="#E0BBE4" position=\{[6, -3, -15]\} />\
        <Cloud opacity=\{0.1\} speed=\{0\} segments=\{20\} color="#FFF9C4" position=\{[0, 5, -10]\} />\
      </Float>\
\
      \{/* Shooting Stars */\}\
      <ShootingStar />\
      <ShootingStar />\
      <ShootingStar />\
      <ShootingStar />\
      <ShootingStar />\
\
      <ambientLight intensity=\{0.8\} />\
      <pointLight position=\{[10, 10, 10]\} intensity=\{2.5\} color="#FFF9C4" />\
      <spotLight position=\{[-10, 10, 10]\} angle=\{0.2\} penumbra=\{1\} intensity=\{1.5\} color="#E0BBE4" />\
      <HeroPlanet />\
    </>\
  );\
\};\
\
export default function App() \{\
  const [gameState, setGameState] = useState<GameState>('START');\
  const [eggyConfig, setEggyConfig] = useState<EggyConfig>(\{ color: '#FFD93D', elasticity: 0.1 \});\
  const [activeTrouble, setActiveTrouble] = useState<Trouble | null>(null);\
  const [aiResponse, setAiResponse] = useState<\{ text: string; emoji: string \} | null>(null);\
  const [isGenerating, setIsGenerating] = useState(false);\
  const [replyText, setReplyText] = useState('');\
\
  const handleStart = () => setGameState('CREATE_EGGY');\
  const handleEggyDone = () => setGameState('PLAZA');\
  \
  const handleCatch = (trouble: Trouble) => \{\
    setActiveTrouble(trouble);\
    setGameState('UNPACK');\
  \};\
\
  const handleSendComfort = async (text: string) => \{\
    setIsGenerating(true);\
    const messageToSend = text || replyText;\
    const result = await generateEncouragement(activeTrouble?.text || "", messageToSend);\
    setAiResponse(result);\
    setIsGenerating(false);\
    setReplyText('');\
    \
    // Success feedback: Firework effect\
    const duration = 3 * 1000;\
    const animationEnd = Date.now() + duration;\
    const defaults = \{ startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 \};\
\
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;\
\
    const interval: any = setInterval(function() \{\
      const timeLeft = animationEnd - Date.now();\
\
      if (timeLeft <= 0) \{\
        return clearInterval(interval);\
      \}\
\
      const particleCount = 50 * (timeLeft / duration);\
      // since particles fall down, start a bit higher than random\
      confetti(\{ ...defaults, particleCount, origin: \{ x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 \} \});\
      confetti(\{ ...defaults, particleCount, origin: \{ x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 \} \});\
      // Central burst\
      if (timeLeft > duration - 500) \{\
        confetti(\{ ...defaults, particleCount: 150, scalar: 2, origin: \{ x: 0.5, y: 0.4 \} \});\
      \}\
    \}, 250);\
\
    setTimeout(() => \{\
      setGameState('PLAZA');\
      setActiveTrouble(null);\
      setAiResponse(null);\
    \}, 3000);\
  \};\
\
  return (\
    <div className="h-screen w-screen bg-[#FFF9C4] flex items-center justify-center font-sans">\
      <div className="relative w-full h-full max-w-[500px] max-h-[900px] bg-gradient-to-br from-[#B5EAD7] via-[#E0BBE4] to-[#FFB7B2] overflow-hidden shadow-2xl md:rounded-[3rem] md:border-[12px] md:border-white/20">\
        \{/* Background Atmosphere */\}\
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white/30 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />\
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />\
        \
        <AnimatePresence mode="wait">\
          \{gameState === 'START' && (\
            <motion.div \
              key="start"\
              initial=\{\{ opacity: 0 \}\}\
              animate=\{\{ opacity: 1 \}\}\
              exit=\{\{ opacity: 0 \}\}\
              className="flex flex-col items-center justify-center h-full z-10 p-6 text-center relative"\
            >\
              \{/* Cosmic Background for Start Screen */\}\
              <div className="absolute inset-0 z-0">\
                <Canvas shadows dpr=\{[1, 2]\} gl=\{\{ antialias: true, powerPreference: "high-performance" \}\}>\
                  <PerspectiveCamera makeDefault position=\{[0, 0, 8]\} fov=\{50\} />\
                  <CosmicScene />\
                </Canvas>\
              </div>\
\
              <div className="z-10 flex flex-col items-center">\
                <h1 className="text-5xl font-black mb-4 tracking-tighter text-jelly-purple drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">\
                  \uc0\u27809 \u20851 \u31995 \u27966 \u23545 
\f1 \

\f0                 </h1>\
                <p className="text-lg text-jelly-purple/70 mb-12 max-w-[260px] mx-auto font-bold">\
                  \uc0\u22312 \u36825 \u37324 \u65292 \u27599 \u19968 \u20010 \u28902 \u24700 \u37117 \u20250 \u21464 \u25104 <br/>\u23431 \u23449 \u20013 \u26368 \u32474 \u28866 \u30340 \u28895 \u33457 
\f1 \

\f0                 </p>\
                <button \
                  onClick=\{handleStart\}\
                  className="jelly-button bg-white text-jelly-purple px-10 py-4 rounded-full text-lg font-black flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.4)] border-b-4 border-black/5"\
                >\
                  <SparklesIcon className="w-4 h-4 text-jelly-pink" />\
                  \uc0\u21152 \u20837 \u27835 \u24840 \u26143 \u29699 
\f1 \

\f0                 </button>\
              </div>\
            </motion.div>\
          )\}\
\
          \{gameState === 'CREATE_EGGY' && (\
            <motion.div \
              key="create"\
              initial=\{\{ opacity: 0, x: '100%' \}\}\
              animate=\{\{ opacity: 1, x: 0 \}\}\
              exit=\{\{ opacity: 0, x: '-100%' \}\}\
              className="h-full flex flex-col"\
            >\
              <div className="flex-1">\
                <Canvas dpr=\{[1, 2]\} camera=\{\{ position: [0, 0, 5], fov: 45 \}\} gl=\{\{ antialias: true \}\}>\
                  <Stars radius=\{50\} depth=\{20\} count=\{800\} factor=\{2\} saturation=\{0\} fade speed=\{0\} />\
                  <ambientLight intensity=\{1\} />\
                  <pointLight position=\{[10, 10, 10]\} />\
                  <Eggy color=\{eggyConfig.color\} elasticity=\{eggyConfig.elasticity\} scale=\{1.2\} />\
                </Canvas>\
              </div>\
              <div className="glass-panel m-4 p-6 flex flex-col gap-5">\
                <h2 className="text-xl font-bold flex items-center gap-2">\
                  <Smile className="text-jelly-yellow w-6 h-6" /> \uc0\u25423 \u25423 \u20320 \u30340 \u26143 \u29699 
\f1 \

\f0                 </h2>\
                \
                <div className="space-y-3">\
                  <label className="block text-xs font-medium opacity-70 uppercase tracking-widest">\uc0\u36873 \u25321 \u39068 \u33394 </label>\
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">\
                    \{[\
                      '#FFB7B2', // Macaron Pink\
                      '#FFDAC1', // Macaron Peach\
                      '#E2F0CB', // Macaron Green\
                      '#B5EAD7', // Macaron Mint\
                      '#C7CEEA', // Macaron Blue\
                      '#E0BBE4'  // Macaron Lavender\
                    ].map(c => (\
                      <button \
                        key=\{c\}\
                        onClick=\{() => setEggyConfig(prev => (\{ ...prev, color: c \}))\}\
                        className=\{`w-10 h-10 shrink-0 rounded-full border-4 transition-transform $\{eggyConfig.color === c ? 'border-white scale-110' : 'border-transparent'\}`\}\
                        style=\{\{ backgroundColor: c \}\}\
                      />\
                    ))\}\
                  </div>\
                </div>\
\
                <div className="space-y-3">\
                  <label className="block text-xs font-medium opacity-70 uppercase tracking-widest">Q\uc0\u24377 \u31243 \u24230 </label>\
                  <input \
                    type="range" \
                    min="0.05" \
                    max="0.3" \
                    step="0.01"\
                    value=\{eggyConfig.elasticity\}\
                    onChange=\{(e) => setEggyConfig(prev => (\{ ...prev, elasticity: parseFloat(e.target.value) \}))\}\
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-jelly-green"\
                  />\
                </div>\
\
                <button \
                  onClick=\{handleEggyDone\}\
                  className="jelly-button bg-jelly-pink py-4 rounded-2xl text-lg font-bold mt-2"\
                >\
                  \uc0\u23601 \u36825 \u26679 \u65292 \u21457 \u23556 
\f2 \uc0\u55357 \u56960 
\f1 \

\f0                 </button>\
              </div>\
            </motion.div>\
          )\}\
\
          \{gameState === 'PLAZA' && (\
            <motion.div \
              key="plaza"\
              initial=\{\{ opacity: 0 \}\}\
              animate=\{\{ opacity: 1 \}\}\
              exit=\{\{ opacity: 0 \}\}\
              className="h-full w-full"\
            >\
              <Plaza \
                onCatch=\{handleCatch\} \
                eggyColor=\{eggyConfig.color\} \
                eggyElasticity=\{eggyConfig.elasticity\} \
              />\
              \
              <div className="absolute top-6 left-4 right-4 flex justify-between items-center pointer-events-none">\
                <div className="glass-panel px-3 py-1.5 flex items-center gap-2">\
                  <div className="w-2 h-2 bg-jelly-green rounded-full animate-pulse" />\
                  <span className="text-xs font-bold">\uc0\u33021 \u37327 : 88%</span>\
                </div>\
                <div className="glass-panel px-3 py-1.5">\
                  <span className="text-xs font-bold">Lv.3</span>\
                </div>\
              </div>\
\
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-4">\
                <button \
                  onClick=\{() => setGameState('ISLAND')\}\
                  className="jelly-button bg-white/10 p-3 rounded-xl backdrop-blur-md"\
                >\
                  <Home className="w-6 h-6" />\
                </button>\
                <button className="jelly-button bg-jelly-yellow p-6 rounded-full shadow-xl -mb-2">\
                  <Heart className="w-10 h-10 text-jelly-pink fill-current" />\
                </button>\
                <button className="jelly-button bg-white/10 p-3 rounded-xl backdrop-blur-md">\
                  <Backpack className="w-6 h-6" />\
                </button>\
              </div>\
            </motion.div>\
          )\}\
\
          \{gameState === 'ISLAND' && (\
            <motion.div \
              key="island"\
              initial=\{\{ opacity: 0 \}\}\
              animate=\{\{ opacity: 1 \}\}\
              exit=\{\{ opacity: 0 \}\}\
              className="h-full w-full"\
            >\
              <Island eggyColor=\{eggyConfig.color\} eggyElasticity=\{eggyConfig.elasticity\} />\
              \
              <button \
                onClick=\{() => setGameState('PLAZA')\}\
                className="absolute top-6 left-4 jelly-button bg-white/30 px-4 py-2 rounded-2xl backdrop-blur-md flex items-center gap-2 border border-white/20 shadow-lg z-50"\
              >\
                <ArrowLeft className="w-5 h-5" />\
                <span className="font-bold text-sm">\uc0\u36820 \u22238 \u24191 \u22330 </span>\
              </button>\
            </motion.div>\
          )\}\
\
          \{gameState === 'UNPACK' && activeTrouble && (\
            <motion.div \
              key="unpack"\
              initial=\{\{ opacity: 0, scale: 0.8 \}\}\
              animate=\{\{ opacity: 1, scale: 1 \}\}\
              exit=\{\{ opacity: 0, scale: 1.2 \}\}\
              className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"\
            >\
              <div className="glass-panel w-full p-6 relative overflow-hidden">\
                <button \
                  onClick=\{() => setGameState('PLAZA')\}\
                  className="absolute top-4 right-4 text-white/50 hover:text-white"\
                >\
                  <X className="w-6 h-6" />\
                </button>\
\
                <div className="text-center mb-6">\
                  <motion.div \
                    animate=\{\{ \
                      rotate: [0, 360],\
                      scale: [1, 1.05, 1]\
                    \}\}\
                    transition=\{\{ \
                      rotate: \{ repeat: Infinity, duration: 10, ease: "linear" \},\
                      scale: \{ repeat: Infinity, duration: 2, ease: "easeInOut" \}\
                    \}\}\
                    className="w-24 h-24 mx-auto mb-6 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] relative flex items-center justify-center"\
                    style=\{\{ \
                      backgroundColor: activeTrouble.color,\
                      boxShadow: `0 0 40px $\{activeTrouble.color\}88`\
                    \}\}\
                  >\
                    \{/* Planet Ring Visual */\}\
                    <div className="absolute w-[140%] h-[2px] bg-white/30 rotate-[25deg] blur-[1px]" />\
                    <SparklesIcon className="w-10 h-10 text-white/80" />\
                  </motion.div>\
                  <h3 className="text-xl font-bold mb-2">\uc0\u27491 \u22312 \u23558 \u28902 \u24700 \u36716 \u21270 \u20026 \u28895 \u33457 ...</h3>\
                  <div className="bg-white/10 p-4 rounded-2xl italic text-base leading-relaxed border border-white/5">\
                    \'93\{activeTrouble.text\}\'94\
                  </div>\
                </div>\
\
                \{aiResponse ? (\
                  <motion.div \
                    initial=\{\{ y: 20, opacity: 0 \}\}\
                    animate=\{\{ y: 0, opacity: 1 \}\}\
                    className="bg-jelly-green/30 p-5 rounded-2xl border border-jelly-green/50 text-center"\
                  >\
                    <p className="text-xl mb-1">\{aiResponse.emoji\}</p>\
                    <p className="text-lg font-medium">\{aiResponse.text\}</p>\
                  </motion.div>\
                ) : (\
                  <div className="space-y-4">\
                    <div className="space-y-2">\
                      <p className="text-center text-xs opacity-60 uppercase tracking-widest">\uc0\u20889 \u19979 \u20320 \u30340 \u27835 \u24840 \u30041 \u35328 </p>\
                      <textarea \
                        value=\{replyText\}\
                        onChange=\{(e) => setReplyText(e.target.value)\}\
                        placeholder="\uc0\u36755 \u20837 \u20320 \u24819 \u23545 \u33258 \u24049 \u25110 \u20182 \u20154 \u35828 \u30340 \u35805 ..."\
                        className="w-full bg-white/10 rounded-2xl p-4 text-sm border border-white/5 focus:border-white/20 outline-none resize-none h-24 transition-colors"\
                      />\
                    </div>\
\
                    <div className="space-y-2">\
                      <p className="text-center text-xs opacity-60 uppercase tracking-widest">\uc0\u25110 \u32773 \u36873 \u19968 \u20010 \u24555 \u25463 \u22238 \u22797 </p>\
                      <div className="grid grid-cols-2 gap-2">\
                        \{POSITIVE_PHRASES.map(phrase => (\
                          <button \
                            key=\{phrase\}\
                            onClick=\{() => handleSendComfort(phrase)\}\
                            disabled=\{isGenerating\}\
                            className="jelly-button bg-white/10 py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 disabled:opacity-50"\
                          >\
                            \{phrase\}\
                          </button>\
                        ))\}\
                      </div>\
                    </div>\
\
                    <button \
                      onClick=\{() => handleSendComfort("")\}\
                      disabled=\{isGenerating\}\
                      className="w-full jelly-button bg-jelly-yellow py-3.5 rounded-2xl text-jelly-purple font-black flex items-center justify-center gap-2 text-sm"\
                    >\
                      \{isGenerating ? "\uc0\u27491 \u22312 \u28857 \u29123 \u27835 \u24840 \u28895 \u33457 ..." : <><SparklesIcon className="w-4 h-4" /> \u28857 \u29123 \u27835 \u24840 \u28895 \u33457 </>\}\
                    </button>\
                  </div>\
                )\}\
              </div>\
            </motion.div>\
          )\}\
        </AnimatePresence>\
      </div>\
    </div>\
  );\
\}\
}