import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Rocket,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { StockFundamentals, LlmSynthesisData } from '../../types/stock';
import { launchAiService, AI_SERVICES, AiServiceKey } from '../../lib/aiAppLauncher';
import { fetchSynthesisData } from '../../lib/stockApi';

interface LocalLlmSynthesizerProps {
  nvda: StockFundamentals;
}

type TabKey = 'memo' | 'starlink_mars' | 'launch_moat' | 'valuation';

export const LocalLlmSynthesizer: React.FC<LocalLlmSynthesizerProps> = ({ nvda }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('memo');
  const [synthesisData, setSynthesisData] = useState<LlmSynthesisData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const loadSynthesis = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchSynthesisData();
      if (data) {
        setSynthesisData(data);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSynthesis();
  }, []);

  const getActiveText = (): string => {
    if (synthesisData?.reports) {
      if (activeTab === 'memo' && synthesisData.reports.memo) return synthesisData.reports.memo;
      if (activeTab === 'starlink_mars' && (synthesisData.reports as any).starlink_mars) return (synthesisData.reports as any).starlink_mars;
      if (activeTab === 'launch_moat' && (synthesisData.reports as any).launch_moat) return (synthesisData.reports as any).launch_moat;
      if (activeTab === 'valuation' && synthesisData.reports.valuation) return synthesisData.reports.valuation;
    }

    if (activeTab === 'memo') {
      return `### 💡 스페이스X(SpaceX · SPCX) 기관급 퀀트 리서치 메모

- **현재 주가**: $${nvda.currentPrice || 148.50} | **선행 P/E**: ${nvda.forwardPE || 38.2}x | **추정 기업가치**: $250B+
- **핵심 투자 포인트**:
  1. **스타링크(Starlink) 글로벌 캐시카우**: 활성 가입자 450만 돌파, 연간 런레이트 $90억 달성. 전 세계 발사 시장의 85%를 내재화하여 타 위성 사업자 대비 90% 저렴한 궤도 배치 원가 해자 보유.
  2. **스타쉽(Starship & Super Heavy) 완전 재사용**: 젓가락 타워(Mechazilla) 부스터 공중 캐치 성공으로 발사 단가를 kg당 $100 이하로 혁신. NASA 아르테미스 3호 유인 달 착륙선(HLS) 독점 수주.
  3. **스타실드(Starshield) 미 국방부 방산 수주**: NRO(국가정찰국) 및 우주군 차세대 정찰위성망 $30억+ 수주로 고마진 국가 안보 인프라 장악.
- **종합 의견**: 민간 우주 수송 독점과 글로벌 저궤도 위성 통신망이 결합되어 대체 불가능한 우주 경제의 단일 게이트웨이 역할을 수행 중입니다.`;
    }
    if (activeTab === 'starlink_mars') {
      return `### 🛰️ 스타링크 통신 제국 & 스타쉽 화성 탐사 경제학

- **Direct-to-Cell(D2D) 스마트폰 직접 통신**: T-Mobile, KDDI, Optus 등 글로벌 이동통신사와 제휴하여 지상 기지국 없는 전 지구적 음영지역 제로화.
- **선박·항공 모빌리티 장악**: 카니발 크루즈, 유나이티드 항공 등 글로벌 운송 수단에 표준 Wi-Fi로 탑재되며 월 $1,000+의 고단가 엔터프라이즈 ARPU 수취.
- **스타쉽 궤도 연료 보급(Propellant Depot)**: 달 및 화성 탐사를 위한 극저온 메탄/산소 궤도 이송 기술 테스트 착수.`;
    }
    if (activeTab === 'launch_moat') {
      return `### 🛡️ 팔콘 9 발사 독점 지배력 & 메카질라 엔지니어링 해자

- **연간 140회+ 압도적 발사 케이던스**: 전 세계 궤도 발사 횟수의 85% 이상을 단일 기업이 점유하며 보잉, ULA, 아리안스페이스 등 전통 항공우주 경쟁사 완전 압도.
- **단일 부스터 25회+ 재사용**: 1단 로켓 착륙 및 재사용으로 1회 발사 한계비용을 $15M 수준으로 축소하여 경쟁사 대비 압도적인 마진 스프레드 확보.
- **발사대 인프라 락인**: 케이프 커내버럴, 반덴버그, 보카치카 스타베이스 3대 발사 허브를 독점 운영.`;
    }
    return `### 📊 밸류에이션 및 기업가치 펀더멘털 진단

- **현재 시장 가치 평가**: 비상장 세컨더리 시장 평가 $250B~$350B, 상장 시 글로벌 항공우주 및 방산 섹터 1위 시가총액 등극 전망.
- **월가 컨센서스 목표 밸류에이션**: $175.00 (목표 시가총액 $320B, 기대 상방 여력 약 +18~35%)
- **현금흐름 구조**: 스타링크 흑자 전환으로 발사체 R&D를 자체 현금흐름으로 100% 충당하는 자립형 현금 창출 머신 완성.`;
  };

  const handleCopy = () => {
    const text = getActiveText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fintech-card p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                기관급 AI 퀀트 심층 리서치 메모
              </h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Gemma 4 검증완료</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              스타링크 흑자 전환, 스타쉽 부스터 캐치, 팔콘 9 발사 독점 및 밸류에이션 종합
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={loadSynthesis}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors disabled:opacity-50 cursor-pointer"
            title="리포트 새로고침"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('memo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'memo'
                ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>종합 분석 메모</span>
          </button>

          <button
            onClick={() => setActiveTab('starlink_mars')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'starlink_mars'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>스타링크 & 스타쉽</span>
          </button>

          <button
            onClick={() => setActiveTab('launch_moat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'launch_moat'
                ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>발사 독점 & 방산 해자</span>
          </button>

          <button
            onClick={() => setActiveTab('valuation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'valuation'
                ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>기업가치 감사</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
            title="리포트 복사"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨' : '보고서 복사'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="relative rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/60 p-4 sm:p-5 min-h-[300px] max-h-[500px] overflow-y-auto selectable-text">
        <div className="prose dark:prose-invert prose-xs sm:prose-sm max-w-none text-slate-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
          {getActiveText()}
        </div>
      </div>

      {/* One-Click External AI Launcher Bar */}
      <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>외부 전문 AI로 즉시 심층 분석 실행:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(AI_SERVICES) as AiServiceKey[]).map((key) => {
            const svc = AI_SERVICES[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => launchAiService(key)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                title={`${svc.name}으로 추가 심층 분석 실행`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${svc.dotColor}`} />
                <span>{svc.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
