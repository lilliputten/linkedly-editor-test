import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { Scrollable } from 'src/ui/Basic';

export function MainPage() {
  useCommonAppNavigation();
  const itemsCount = 20;
  const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
  return (
    <Scrollable>
      <p>MainPage</p>
      {items}
    </Scrollable>
  );
}
