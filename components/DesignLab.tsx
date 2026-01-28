import React, { useState } from 'react';
import { Sparkles, Send, Download, Video, Loader2, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { generateStylingAdvice, generateDesignPattern, generateRunwayVideo } from '../services/geminiService';

const DesignLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stylist' | 'pattern' | 'runway'>('stylist');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-4">FITTARA <span className="text-amber-500">AI Design Lab</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Experience the future of fashion. Consult our AI stylist, generate unique patterns, or visualize your outfit on the runway.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex bg-surface rounded-full p-1 border border-gray-800">
          <button 
            onClick={() => setActiveTab('stylist')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'stylist' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
          >
            <div className="flex items-center gap-2"><MessageSquare size={16} /> Stylist</div>
          </button>
          <button 
            onClick={() => setActiveTab('pattern')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'pattern' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
          >
            <div className="flex items-center gap-2"><ImageIcon size={16} /> Pattern Gen</div>
          </button>
          <button 
            onClick={() => setActiveTab('runway')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'runway' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
          >
            <div className="flex items-center gap-2"><Video size={16} /> Virtual Runway</div>
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 md:p-10 rounded-2xl min-h-[500px]">
        {activeTab === 'stylist' && <StylistTab />}
        {activeTab === 'pattern' && <PatternTab />}
        {activeTab === 'runway' && <RunwayTab />}
      </div>
    </div>
  );
};

const StylistTab = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const result = await generateStylingAdvice(query, useThinking);
      setResponse(result || "I couldn't generate a response. Please try again.");
    } catch (e) {
      setResponse("Error connecting to AI Stylist. Please check API Key configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 min-h-[300px] border border-gray-800 rounded-xl p-4 bg-black/20">
        {response ? (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-black" />
            </div>
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">{response}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Sparkles size={48} className="mb-4 opacity-20" />
            <p>Ask me anything about fashion styling, color combinations, or outfit recommendations.</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="thinkingMode" 
                checked={useThinking} 
                onChange={(e) => setUseThinking(e.target.checked)} 
                className="w-4 h-4 text-amber-500 bg-gray-700 border-gray-600 rounded focus:ring-amber-500 focus:ring-2"
            />
            <label htmlFor="thinkingMode" className="text-sm text-gray-400">Deep Thinking Mode (Better for complex wardrobe planning)</label>
        </div>
        <div className="flex gap-2">
            <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="E.g., What should I wear for a summer beach wedding?" 
            className="flex-1 bg-surface border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none"
            />
            <button 
            onClick={handleAsk}
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-500 text-black px-6 rounded-xl font-bold disabled:opacity-50 flex items-center justify-center"
            >
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
        </div>
      </div>
    </div>
  );
};

const PatternTab = () => {
    const [prompt, setPrompt] = useState('');
    const [resolution, setResolution] = useState<"1K" | "2K" | "4K">("1K");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setImage(null);
        try {
            const result = await generateDesignPattern(prompt, resolution);
            setImage(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
  
    return (
      <div className="grid md:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col gap-6">
            <div>
                <label className="block text-sm text-gray-400 mb-2">Pattern Description</label>
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-surface border border-gray-700 rounded-xl p-4 text-white focus:border-amber-500 outline-none h-32 resize-none"
                    placeholder="E.g., Intricate gold paisley pattern on deep royal blue velvet texture..."
                />
            </div>
            
            <div>
                <label className="block text-sm text-gray-400 mb-2">Resolution</label>
                <div className="flex gap-4">
                    {["1K", "2K", "4K"].map((res) => (
                        <button 
                            key={res}
                            onClick={() => setResolution(res as any)}
                            className={`px-4 py-2 rounded-lg border ${resolution === res ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-gray-700 text-gray-400'}`}
                        >
                            {res}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-500 text-black py-3 rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 mt-auto"
            >
                {loading ? <><Loader2 className="animate-spin" /> Generating...</> : <><Sparkles size={18} /> Generate Pattern</>}
            </button>
        </div>

        <div className="bg-black/40 border border-gray-800 rounded-xl flex items-center justify-center min-h-[300px] relative overflow-hidden group">
            {image ? (
                <>
                    <img src={image} alt="Generated Pattern" className="w-full h-full object-contain" />
                    <a href={image} download="fittara-pattern.png" className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download size={20} />
                    </a>
                </>
            ) : (
                <div className="text-gray-600 text-center">
                    <ImageIcon size={48} className="mx-auto mb-2 opacity-30" />
                    <p>Generated design will appear here</p>
                </div>
            )}
            {loading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                         <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-amber-500 text-sm animate-pulse">Designing...</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
};

const RunwayTab = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(f);
        }
    };

    const handleGenerateVideo = async () => {
        if (!preview) return;
        setLoading(true);
        setVideoUrl(null);
        try {
             // Removing data:image/png;base64, prefix
             const base64Data = preview.split(',')[1];
             const result = await generateRunwayVideo(base64Data, "Cinematic fashion runway walk, slow motion, professional lighting");
             setVideoUrl(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 h-full">
            <div className="flex flex-col gap-6">
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-amber-500/50 transition-colors">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="upload-runway" />
                    <label htmlFor="upload-runway" className="cursor-pointer flex flex-col items-center gap-3">
                         <div className="p-4 bg-gray-800 rounded-full text-amber-500"><ImageIcon size={24} /></div>
                         <span className="text-gray-300 font-medium">Upload Outfit Photo</span>
                         <span className="text-gray-500 text-xs">Supports JPG, PNG</span>
                    </label>
                </div>

                {preview && (
                    <div className="relative h-48 bg-black/40 rounded-lg overflow-hidden border border-gray-800">
                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                )}

                <button 
                    onClick={handleGenerateVideo}
                    disabled={!preview || loading}
                    className="bg-amber-600 hover:bg-amber-500 text-black py-3 rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 mt-auto"
                >
                    {loading ? <><Loader2 className="animate-spin" /> Processing Video...</> : <><Video size={18} /> Generate Video</>}
                </button>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-xl flex items-center justify-center min-h-[300px] relative">
                {videoUrl ? (
                    <video controls src={videoUrl} className="w-full h-full rounded-xl" autoPlay loop />
                ) : (
                    <div className="text-gray-600 text-center px-6">
                        <Video size={48} className="mx-auto mb-2 opacity-30" />
                        <p>AI Generated Runway Video will play here</p>
                        <p className="text-xs text-gray-700 mt-2">Powered by Google Veo</p>
                    </div>
                )}
                 {loading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-amber-500 text-sm animate-pulse">Creating Runway Magic...</p>
                            <p className="text-gray-500 text-xs">(This may take a minute)</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DesignLab;