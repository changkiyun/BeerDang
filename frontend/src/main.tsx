import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { pricePer10ml } from './price';
import './style.css';

const canCounts = [4, 6, 8] as const;
const volumes = [355, 485, 500] as const;
const currency = new Intl.NumberFormat('ko-KR');
const unitPrice = new Intl.NumberFormat('ko-KR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function App() {
  const [canCount, setCanCount] = useState<number>(4);
  const [volume, setVolume] = useState<number>(500);
  const [price, setPrice] = useState('');
  const packPrice = Number(price);
  const result = packPrice > 0 ? pricePer10ml(canCount, volume, packPrice) : null;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="맥주당 홈">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <span>맥주당<span className="brand-period">.</span></span>
        </a>
        <span className="header-note">BEER PRICE CALCULATOR</span>
      </header>

      <main className="main-content">
        <section className="intro" aria-labelledby="page-title">
          <div className="eyebrow"><span className="eyebrow-line" /> SMARTER BEER SHOPPING</div>
          <h1 id="page-title">이 맥주,<br /><em>진짜 얼마짜리일까?</em></h1>
          <p className="intro-copy">캔 크기도, 묶음 수도 제각각이니까.<br />같은 10ml로 환산하면 가격이 보입니다.</p>
          <div className="intro-decoration" aria-hidden="true">
            <span className="decoration-top">PRICE / VOLUME</span>
            <span className="decoration-number">10<span>ml</span></span>
            <span className="decoration-bottom">똑똑한 한 잔의 기준</span>
          </div>
        </section>

        <section className="calculator" aria-labelledby="calculator-title">
          <div className="calculator-heading">
            <div>
              <p className="section-label">01 — PRICE CHECK</p>
              <h2 id="calculator-title">맥주 가격 계산기</h2>
            </div>
            <span className="live-badge"><span className="live-dot" /> 실시간 계산</span>
          </div>

          <div className="field-group">
            <div className="field-heading"><span className="field-number">01</span><h3 id="count-label">캔 수</h3><span className="field-caption">한 묶음에 몇 캔인가요?</span></div>
            <div className="choice-grid" role="group" aria-labelledby="count-label">
              {canCounts.map((count) => (
                <button key={count} type="button" className={`choice ${canCount === count ? 'selected' : ''}`} aria-pressed={canCount === count} onClick={() => setCanCount(count)}>
                  <strong>{count}</strong><span>캔</span>
                </button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <div className="field-heading"><span className="field-number">02</span><h3 id="volume-label">캔당 용량</h3><span className="field-caption">캔 하나의 크기</span></div>
            <div className="choice-grid" role="group" aria-labelledby="volume-label">
              {volumes.map((ml) => (
                <button key={ml} type="button" className={`choice ${volume === ml ? 'selected' : ''}`} aria-pressed={volume === ml} onClick={() => setVolume(ml)}>
                  <strong>{ml}</strong><span>ml</span>
                </button>
              ))}
            </div>
          </div>

          <div className="field-group price-field">
            <div className="field-heading"><span className="field-number">03</span><label htmlFor="pack-price">묶음 가격</label><span className="field-caption">전체 가격을 입력하세요</span></div>
            <div className="price-input-wrap">
              <input
                id="pack-price"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={13}
                placeholder="예: 12,900"
                value={price ? currency.format(packPrice) : ''}
                onChange={(event) => setPrice(event.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 9))}
                aria-describedby="price-hint"
              />
              <span className="currency-suffix">원</span>
            </div>
            <p id="price-hint" className="input-hint">쉼표는 자동으로 입력돼요.</p>
          </div>

          <div className="result-card" aria-live="polite" aria-atomic="true">
            <div className="result-topline"><span>YOUR BEER, DECODED</span><span className="result-spark" aria-hidden="true">✳</span></div>
            <p className="result-label">이 맥주의 10ml당 가격</p>
            {result === null ? (
              <p className="result-empty">가격을 입력하면<br />바로 계산해 드릴게요.</p>
            ) : (
              <p className="result-value">{unitPrice.format(result)}<span>원 <small>/ 10ml</small></span></p>
            )}
            <div className="result-divider" />
            <div className="result-details">
              <span>총 용량 <strong>{currency.format(canCount * volume)}ml</strong></span>
              <span>묶음 가격 <strong>{result === null ? '—' : `${currency.format(packPrice)}원`}</strong></span>
            </div>
          </div>
          <p className="formula-note">묶음 가격 ÷ 총 용량 × 10 = 10ml당 가격</p>
        </section>
      </main>

      <footer className="site-footer"><span>맥주당<span className="brand-period">.</span></span><span>가격을 알면, 선택이 쉬워집니다.</span></footer>
    </div>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('앱을 표시할 영역을 찾지 못했습니다.');
createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
