import React from 'react';

export function DummyList() {
  // DEMO: Dummy list
  const itemsCount = 1;
  const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
  return <>{items}</>;
}
