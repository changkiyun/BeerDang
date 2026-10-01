export function pricePer10ml(canCount: number, volumeMl: number, packPrice: number): number {
  if (!Number.isFinite(packPrice) || packPrice <= 0 || canCount <= 0 || volumeMl <= 0) {
    throw new RangeError('캔 수, 용량, 가격은 0보다 커야 합니다.');
  }

  return Math.round((packPrice * 1000) / (canCount * volumeMl)) / 100;
}
