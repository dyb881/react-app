import React from 'react';

/**
 * 动态加载页面
 */
export const lazy = (
  factory: () => Promise<{ default: React.ComponentType<any> }>,
  fallbackProps?: React.HTMLProps<HTMLDivElement>
) => {
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
