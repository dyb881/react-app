import React from 'react';

interface IFactory {
  default: React.ComponentType<any>;
}

/**
 * 动态加载页面
 */
export const lazy = (factory: () => Promise<IFactory>, fallbackProps?: React.HTMLProps<HTMLDivElement>) => {
  const Component = React.lazy(factory);
  const fallback = (
    <div className="fill center" {...fallbackProps}>
      Loading...
    </div>
  );

  return (props: any) => (
    <React.Suspense fallback={fallback}>
      <Component {...props} />
    </React.Suspense>
  );
};

