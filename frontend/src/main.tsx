import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
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
  const [customCanCount, setCustomCanCount] = useState('');
  const [customVolume, setCustomVolume] = useState('');
  const [useCustomCanCount, setUseCustomCanCount] = useState(false);
  const [useCustomVolume, setUseCustomVolume] = useState(false);
  const [price, setPrice] = useState('');
  const packPrice = Number(price);
  const selectedCanCount = useCustomCanCount ? Number(customCanCount) : canCount;
  const selectedVolume = useCustomVolume ? Number(customVolume) : volume;
  const validCanCount = Number.isInteger(selectedCanCount) && selectedCanCount > 0;
  const validVolume = Number.isInteger(selectedVolume) && selectedVolume > 0;
  const totalVolume = validCanCount && validVolume ? selectedCanCount * selectedVolume : null;
  const result = totalVolume && packPrice > 0 ? pricePer10ml(selectedCanCount, selectedVolume, packPrice) : null;

  function changePrice(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const digitsBeforeCaret = input.value.slice(0, input.selectionStart ?? 0).replace(/\D/g, '').length;
    const digits = input.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 9);
    setPrice(digits);

    requestAnimationFrame(() => {
      if (document.activeElement !== input) return;
      let index = 0;
      let seen = 0;
      while (index < input.value.length && seen < digitsBeforeCaret) {
        if (/\d/.test(input.value[index] ?? '')) seen++;
        index++;
      }
      input.setSelectionRange(index, index);
    });
  }

  return (
    <div className="app">
      <header className="topbar"><span className="wordmark">맥주당</span></header>
      <main className="workspace">
        <div className="page-title">
          <h1>10ml당 가격 계산</h1>
          <p>캔 수와 용량이 달라도 같은 기준으로 확인하세요.</p>
        </div>

        <div className="calculator-layout">
          <section className="fields" aria-label="맥주 묶음 정보">
            <fieldset className="field">
              <legend>캔 수</legend>
              <div className="choices">
                {canCounts.map((count) => (
                  <button key={count} type="button" className="choice" aria-pressed={!useCustomCanCount && canCount === count} onClick={() => { setCanCount(count); setUseCustomCanCount(false); }}>
                    {count}<span>캔</span>
                  </button>
                ))}
                <button type="button" className="choice" aria-pressed={useCustomCanCount} onClick={() => setUseCustomCanCount(true)}>기타</button>
              </div>
              {useCustomCanCount && (
                <div className="custom-input">
                  <input
                    aria-label="직접 입력할 캔 수"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={3}
                    placeholder="캔 수 입력"
                    value={customCanCount}
                    onChange={(event) => setCustomCanCount(event.target.value.replace(/\D/g, ''))}
                  />
                  <span aria-hidden="true">캔</span>
                </div>
              )}
            </fieldset>

            <fieldset className="field">
              <legend>캔당 용량</legend>
              <div className="choices">
                {volumes.map((ml) => (
                  <button key={ml} type="button" className="choice" aria-pressed={!useCustomVolume && volume === ml} onClick={() => { setVolume(ml); setUseCustomVolume(false); }}>
                    {ml}<span>ml</span>
                  </button>
                ))}
                <button type="button" className="choice" aria-pressed={useCustomVolume} onClick={() => setUseCustomVolume(true)}>기타</button>
              </div>
              {useCustomVolume && (
                <div className="custom-input">
                  <input
                    aria-label="직접 입력할 캔 용량"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={5}
                    placeholder="용량 입력"
                    value={customVolume}
                    onChange={(event) => setCustomVolume(event.target.value.replace(/\D/g, ''))}
                  />
                  <span aria-hidden="true">ml</span>
                </div>
              )}
            </fieldset>

            <div className="field price-field">
              <label htmlFor="pack-price">묶음 가격 <span className="label-hint">캔 전체 가격</span></label>
              <div className="price-input">
                <input
                  id="pack-price"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={13}
                  placeholder="가격 입력"
                  value={price ? currency.format(packPrice) : ''}
                  onChange={changePrice}
                />
                <span aria-hidden="true">원</span>
              </div>
            </div>
          </section>

          <section className="result" aria-labelledby="result-title">
            <h2 id="result-title">10ml당 가격</h2>
            <div className="result-display" aria-live="polite" aria-atomic="true">
              {result === null ? (
                <p className="result-prompt">묶음 가격을 입력해 주세요.</p>
              ) : (
                <p className="result-amount">{unitPrice.format(result)}<span>원</span></p>
              )}
            </div>
            <dl className="result-info">
              <div><dt>총 용량</dt><dd>{totalVolume ? `${currency.format(totalVolume)}ml` : '—'}</dd></div>
              <div><dt>묶음 가격</dt><dd>{result === null ? '—' : `${currency.format(packPrice)}원`}</dd></div>
            </dl>
            <p className="formula">묶음 가격 ÷ 총 용량 × 10</p>
          </section>
        </div>
      </main>
    </div>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('앱을 표시할 영역을 찾지 못했습니다.');
createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
