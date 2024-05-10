import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';

export function MainPage() {
  useCommonAppNavigation();
  const itemsCount = 2;
  const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
  console.log('XXX', items);
  return (
    <>
      <p>MainPage</p>
      {items}
    </>
  );
}
