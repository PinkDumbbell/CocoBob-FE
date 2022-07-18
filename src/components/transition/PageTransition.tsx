import React, { ReactNode } from 'react';
import { useLocation, useNavigationType, matchRoutes } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { JsxElement } from 'typescript';
import usePrevious from './hooks/usePrevious';
import { PageTransitionGroup, PageTransitionWrapper } from './PageTransition.style';

type PageTransitionProps = {
  transitionKey: string;
  children: ReactNode;
};
type DetailPageType = {
  path: string;
  component: JsxElement;
};

const normalDirection = 'slideLeft';
const reverseDirection = 'slideRight';
const detailPages: DetailPageType[] = [];
const PageTransitionV2 = ({ transitionKey, children }: PageTransitionProps) => {
  const action = useNavigationType();
  const location = useLocation();
  const previousLocation = usePrevious<Location>(location) || {};
  const [matchNextRoute] = matchRoutes(detailPages, location) || [];
  const [matchPreviousRoute] = matchRoutes(detailPages, previousLocation) || [];

  const isPushBehavior = action === 'PUSH';
  const direction = isPushBehavior ? normalDirection : reverseDirection;
  const isDetailPage = isPushBehavior ? matchNextRoute : matchPreviousRoute;
  const animationType = isDetailPage ? direction : 'scale';
  const timeout = 300;

  return (
    <PageTransitionGroup timeout={timeout} type={animationType}>
      <TransitionGroup
        className="container"
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: animationType,
            timeout,
          })
        }
      >
        <CSSTransition key={transitionKey} timeout={timeout} unmountOnExit>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </CSSTransition>
      </TransitionGroup>
    </PageTransitionGroup>
  );
};

export default PageTransitionV2;