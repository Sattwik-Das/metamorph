import { useState, useEffect } from 'react';
import { 
  Home,
  Bot,
  MousePointer2,
  Zap,
  Settings,
  HelpCircle,
  CheckCircle2,
  LogOut,
  Trash2,
  Power,
  EyeOff,
  Eye,
  Copy,
  Key
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------
// Components
// ---------------------------------------------------------

function SidebarItem({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  badge
}: { 
  icon: React.ElementType, 
  label: string, 
  isActive?: boolean,
  onClick?: () => void,
  badge?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-1.5 mb-[2px] rounded-lg text-[13px] transition-colors duration-200 font-medium",
        isActive 
          ? "bg-white/10 text-white" 
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={16} strokeWidth={1.5} className={cn(isActive ? "text-white" : "text-gray-400")} />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-[#007AFF] bg-[#007AFF]/20">
          {badge}
        </span>
      )}
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3 mt-6">
      {title}
    </h3>
  );
}

// ---------------------------------------------------------
// Pages
// ---------------------------------------------------------

function HomePage({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome to Clickit</h1>
        <p className="text-gray-400">Your AI Copilot for macOS is ready to assist.</p>
      </div>
      
      <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-4 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="font-semibold text-lg flex items-center gap-2 text-white">
              <Bot className="text-[#007AFF]" size={20} />
              Talk with an Agent
            </h2>
            <p className="text-sm text-gray-400">
              You are currently on the <strong className="text-white">Free Plan</strong>.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('upgrade')}
            className="text-xs font-medium bg-[#007AFF]/10 text-[#007AFF] px-3 py-1.5 rounded-full hover:bg-[#007AFF]/20 transition"
          >
            Upgrade to Pro
          </button>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-300">Agent Messages</span>
            <span className="text-gray-400">11 / 25 used</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-[#007AFF] h-full rounded-full" style={{ width: '44%' }}></div>
          </div>
          <p className="text-xs text-gray-400">Resets in 14 days.</p>
        </div>

        <button className="w-full bg-[#007AFF] text-white rounded-lg py-2.5 font-medium hover:bg-[#0066CC] transition shadow-sm mt-4">
          Start Conversation
        </button>
      </div>
    </div>
  );
}

function UpgradePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-semibold mb-2 text-white">Upgrade to Pro</h1>
      <p className="text-gray-400 mb-8">Get unlimited access to Opus 4.6 and higher rate limits.</p>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Free Plan */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-80">
          <h2 className="text-xl font-semibold mb-2 text-white">Free Plan</h2>
          <div className="text-3xl font-bold mb-6 text-white">$0<span className="text-sm font-normal text-gray-400">/mo</span></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-gray-400" />
              Basic Sonnet 4.6 access
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-gray-400" />
              100 messages / day
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-gray-400" />
              Standard response speed
            </li>
          </ul>
          <button className="w-full py-2.5 rounded-xl border border-white/10 font-medium text-sm text-gray-300 bg-white/5 cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-2xl p-6 relative">
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#007AFF] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            Recommended
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Pro Plan</h2>
          <div className="text-3xl font-bold mb-6 text-white">$20<span className="text-sm font-normal text-gray-400">/mo</span></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-[#007AFF]" />
              Unlimited Claude Opus 4.6
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-[#007AFF]" />
              Priority inference speed
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-[#007AFF]" />
              Multi-monitor active pointing
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-[#007AFF]" />
              Custom voice training
            </li>
          </ul>
          <button className="w-full py-2.5 rounded-xl font-medium text-sm text-white bg-[#007AFF] hover:bg-[#0066CC] transition">
            Upgrade Now
          </button>
        </div>

      </div>
    </div>
  );
}

function SettingsPage({
  profileName,
  profileColor,
  onUpdateProfile
}: {
  profileName: string;
  profileColor: string;
  onUpdateProfile: (name: string, color: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profileName);
  const [editColor, setEditColor] = useState(profileColor);

  const COLORS = ['bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600'];

  const handleSave = () => {
    if (editName.trim()) {
      onUpdateProfile(editName, editColor);
      setIsEditing(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-semibold mb-8 text-white">Settings</h1>
      
      <div className="space-y-6 flex-1">
        
        {/* Profile Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400">Profile</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6 relative">
            {!isEditing ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner ${profileColor}`}>
                    {profileName.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{profileName || 'User'}</h2>
                    <p className="text-sm text-gray-400">Clickit Pro Member</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Profile Color</label>
                  <div className="flex items-center gap-3">
                    {COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setEditColor(c)}
                        className={`w-8 h-8 rounded-full ${c} ${editColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#141414]' : 'opacity-70 hover:opacity-100'} transition`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#007AFF] hover:bg-[#0066CC] text-white text-sm font-medium rounded-lg transition"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(profileName);
                      setEditColor(profileColor);
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400">Account</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="text-sm text-gray-400">hello@soyuz.com</p>
              </div>
              <button className="text-sm font-medium text-[#007AFF]">Edit</button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Plan</p>
                <p className="text-sm text-gray-400">Free</p>
              </div>
              <button className="text-sm font-medium text-[#007AFF]">Upgrade</button>
            </div>
          </div>
        </div>

        {/* Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400">System</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Start at Login</p>
                <p className="text-sm text-gray-400">Launch Clickit automatically</p>
              </div>
              <div className="w-12 h-6 bg-[#007AFF] rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
            <div className="p-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 cursor-pointer transition">
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </div>
            <div className="p-4 flex flex-col gap-1 text-red-400 hover:bg-red-500/10 cursor-pointer transition">
              <div className="flex items-center gap-3">
                <Trash2 size={18} />
                <span className="text-sm font-medium">Delete Account</span>
              </div>
              <p className="text-xs text-red-400/70 ml-[30px]">Automatically delete all your data. No data is stored in our backend.</p>
            </div>
            <div className="p-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 cursor-pointer transition">
              <Power size={18} />
              <span className="text-sm font-medium">Quit Clickit</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Helper Components
// ---------------------------------------------------------

function ApiIntegrationCard({ api }: { api: any }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-5 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-inner ${api.color}`}>
            {api.icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">{api.name}</h3>
            <p className="text-xs text-gray-400">{api.role}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-[#34C759]/10 text-[#34C759] px-2.5 py-1 rounded-full border border-[#34C759]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#34C759]"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Connected</span>
        </div>
      </div>

      <div className="pt-1">
        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">API Key</label>
        <input 
          type="password"
          value={api.mockKey}
          readOnly
          className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-gray-400 focus:outline-none select-all"
        />
      </div>
    </div>
  );
}

function ApiPage() {
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockToken = "clk_test_9f82kd01mc4x9zlaQ72vPmnO94yrtB21";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/integrations')
      .then(res => res.json())
      .then(data => {
        // Need to add color/icon properties based on ID for the UI
        const mappedData = data.map((api: any) => ({
          ...api,
          icon: api.name.charAt(0),
          color: api.id === 'elevenlabs' ? 'bg-indigo-500' : 
                 api.id === 'swift' ? 'bg-orange-500' :
                 api.id === 'gemini' ? 'bg-blue-500' :
                 api.id === 'sarvam' ? 'bg-emerald-500' : 'bg-red-500'
        }));
        setIntegrations(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch integrations', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-semibold mb-2 tracking-tight">Developer API</h1>
      <p className="text-gray-400 mb-8">Manage your API tokens and integrate Clickit into your own workflows.</p>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-medium mb-2 text-white">Your API Key</h2>
        <p className="text-sm text-gray-400 mb-6">
          This is your secret API token. Keep it safe and do not share it. You can use it to authenticate requests to the Clickit backend.
        </p>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input 
              type={showToken ? "text" : "password"} 
              value={mockToken}
              readOnly
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm font-mono text-white focus:outline-none"
            />
            <button 
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
            >
              {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center w-12 h-[46px] bg-[#007AFF] text-white rounded-xl hover:bg-[#0066CC] transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="text-lg font-medium text-white">Connected Integrations</h2>
        <span className="text-xs font-medium text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          {integrations.filter(i => i.isActive).length} Active
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
        {loading ? (
          <div className="col-span-1 md:col-span-2 text-center text-gray-500 py-8">Loading integrations...</div>
        ) : (
          integrations.map((api) => (
            <ApiIntegrationCard 
              key={api.id}
              api={api}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Onboarding / Login Page
// ---------------------------------------------------------

function LoginPage({ onLogin }: { onLogin: (name: string, color: string) => void }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('bg-blue-600');
  
  const COLORS = ['bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600'];

  const handleComplete = () => {
    if (name.trim().length === 0) return;
    onLogin(name, color);
  };

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] overflow-hidden text-white select-none rounded-2xl border border-white/10 relative" style={{ WebkitAppRegion: 'drag' } as any}>
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#007AFF] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

      <div className="flex flex-col flex-1 items-center justify-center relative z-10 p-8" style={{ WebkitAppRegion: 'no-drag' } as any}>
        
        {/* Login Container */}
        <div className="w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="flex flex-col items-center mb-8">
            <img src="/logos/logo-image.png" alt="Clickit" className="h-12 w-auto brightness-0 invert mb-4" />
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome to Clickit</h1>
            <p className="text-sm text-gray-400 text-center">Customize your profile to get started.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Your Name</label>
              <input 
                type="text" 
                placeholder="e.g. Satoshi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleComplete()}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">Profile Color</label>
              <div className="flex items-center justify-between px-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${c} ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#141414]' : 'opacity-70 hover:opacity-100'} transition shadow-inner`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleComplete}
            disabled={name.trim().length === 0}
            className="w-full bg-[#007AFF] hover:bg-[#0066CC] disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-xl py-3.5 font-medium transition-colors shadow-[0_0_20px_rgba(0,122,255,0.3)] flex items-center justify-center gap-2"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Main App / Layout
// ---------------------------------------------------------

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('clickit_is_logged_in') === 'true');
  const [profileName, setProfileName] = useState(() => localStorage.getItem('clickit_profile_name') || '');
  const [profileColor, setProfileColor] = useState(() => localStorage.getItem('clickit_profile_color') || 'bg-blue-600');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:8000/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data.fullName) setProfileName(data.fullName);
          if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
        })
        .catch(err => console.error("Failed to fetch profile", err));
    }
  }, [isLoggedIn]);
  
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (name: string, color: string) => {
    localStorage.setItem('clickit_is_logged_in', 'true');
    localStorage.setItem('clickit_profile_name', name);
    localStorage.setItem('clickit_profile_color', color);
    setProfileName(name);
    setProfileColor(color);
    setIsLoggedIn(true);
  };

  const handleUpdateProfile = (name: string, color: string) => {
    localStorage.setItem('clickit_profile_name', name);
    localStorage.setItem('clickit_profile_color', color);
    setProfileName(name);
    setProfileColor(color);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] overflow-hidden text-white select-none rounded-2xl border border-white/10">
      
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col pt-12 pb-4 h-full relative z-20" style={{ WebkitAppRegion: 'drag' } as any}>
        
        {/* Logo */}
        <div className="px-6 mb-8 flex items-center gap-2.5 mt-2">
          <img src="/logos/logo-image.png" alt="Clickit" className="h-8 w-auto brightness-0 invert" />
          <img src="/logos/logotext.png" alt="Clickit" className="h-5 w-auto brightness-0 invert" />
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 pb-8" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <SectionHeader title="Main" />
          <SidebarItem 
            icon={Home} 
            label="Home" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <SidebarItem 
            icon={Bot} 
            label="Agents" 
            isActive={activeTab === 'agents'} 
            onClick={() => setActiveTab('agents')} 
          />
          
          <SectionHeader title="Shortcuts" />
          <SidebarItem 
            icon={MousePointer2} 
            label="Undock Cursor" 
            isActive={activeTab === 'undock'} 
            onClick={() => setActiveTab('undock')} 
          />

          <SectionHeader title="Account" />
          <SidebarItem 
            icon={Zap} 
            label="Upgrade" 
            isActive={activeTab === 'upgrade'} 
            onClick={() => setActiveTab('upgrade')} 
            badge="PRO"
          />
          <SidebarItem 
            icon={Key} 
            label="Developer API" 
            isActive={activeTab === 'api'} 
            onClick={() => setActiveTab('api')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
          <SidebarItem 
            icon={HelpCircle} 
            label="Help" 
            isActive={activeTab === 'help'} 
            onClick={() => setActiveTab('help')} 
          />
        </div>

        {/* User Profile Badge at bottom of Sidebar */}
        <div className="px-4 mt-auto" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <div 
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-inner ${avatarUrl ? '' : profileColor} overflow-hidden`}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={profileName} className="w-full h-full object-cover" />
              ) : (
                profileName.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profileName || 'User'}</p>
              <p className="text-xs text-gray-400 truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full bg-[#0A0A0A] relative overflow-y-auto" style={{ WebkitAppRegion: 'no-drag' } as any}>
        
        {/* Custom macOS Titlebar area (invisible but provides drag region at top) */}
        <div className="h-10 w-full absolute top-0 left-0 z-50 pointer-events-none" style={{ WebkitAppRegion: 'drag' } as any}></div>

        <div className="h-full pt-10">
          {activeTab === 'settings' && (
            <SettingsPage 
              profileName={profileName} 
              profileColor={profileColor} 
              onUpdateProfile={handleUpdateProfile} 
            />
          )}
          {activeTab === 'upgrade' && <UpgradePage />}
          {activeTab === 'api' && <ApiPage />}
          {activeTab === 'undock' && (
            <div className="p-8 max-w-3xl mx-auto flex items-center justify-center h-[50vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MousePointer2 size={32} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-white">Cursor Undocked</h2>
                <p className="text-gray-400">Your cursor is now free from the main window.</p>
              </div>
            </div>
          )}
          {!['settings', 'upgrade', 'api', 'undock'].includes(activeTab) && <HomePage onNavigate={setActiveTab} />}
        </div>
      </div>

    </div>
  );
}
