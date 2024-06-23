import { HeaderGame } from './Header';
import Main from './main';
import './game-layout.css';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GameLayout({ children }: Props) {
  return (
    <div
      style={{
        background: ' url(/Content/images/bg_body.jpg) rgb(40, 40, 40)',
        margin: '0px auto',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        transformOrigin: '0px 0px',
      }}>
      <div
        style={{
          position: 'relative',
          width: '1650px',
          maxWidth: '100%',
          // top: 0,
          // left: 0,
          // right: 0,
          margin: '0 auto',
          paddingTop: '57.4858757%',
          overflow: 'hidden',
          minWidth: '1469px',
        }}>
        <div className="main_layout">
          <HeaderGame />

          <Main>{children}</Main>
        </div>
      </div>
    </div>
  );
}
