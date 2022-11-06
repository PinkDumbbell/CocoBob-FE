import { HeaderContents, HeaderWrapper, Title } from '@/components/layout/Header.style';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';

interface ShopHeaderProps {
  title: string;
  goSearchPage: () => void;
}
export default function Header({ title, goSearchPage }: ShopHeaderProps) {
  return (
    <HeaderWrapper>
      <HeaderContents>
        <Title isHide={false}>{title}</Title>
        <div className="absolute right-4 flex items-center" onClick={goSearchPage}>
          <SearchIcon />
        </div>
      </HeaderContents>
    </HeaderWrapper>
  );
}
