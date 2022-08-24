import {forwardRef} from 'react';

import {SvgIcon, SVGIconProps} from './svgIcon';

const IconLearnRuler = forwardRef<SVGSVGElement, SVGIconProps>((props, ref) => {
  return (
    <SvgIcon {...props} ref={ref}>
      <path d="M214.117,164.496L51.818,2.197c-2.929-2.929-7.678-2.929-10.606,0L2.197,41.211c-2.929,2.929-2.929,7.678,0,10.606l162.299,162.299c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197l39.014-39.014C217.046,172.174,217.046,167.425,214.117,164.496zM169.799,198.207l-10.579-10.579l8.775-8.775c1.953-1.953,1.953-5.119,0-7.071c-1.953-1.952-5.118-1.952-7.071,0l-8.775,8.775l-10.12-10.12l14.204-14.204c1.953-1.953,1.953-5.119,0-7.071c-1.953-1.951-5.118-1.952-7.071,0l-14.204,14.204l-10.12-10.12l8.775-8.775c1.953-1.953,1.953-5.119,0-7.071c-1.952-1.952-5.117-1.952-7.071,0l-8.775,8.775l-10.12-10.12l14.204-14.204c1.953-1.953,1.953-5.119,0-7.071c-1.953-1.952-5.118-1.952-7.071,0l-14.204,14.204l-10.12-10.12l8.775-8.775c1.953-1.953,1.953-5.119,0-7.071c-1.953-1.952-5.118-1.952-7.071,0l-8.775,8.775l-10.12-10.12l14.204-14.204c1.953-1.953,1.953-5.119,0-7.071c-1.952-1.951-5.117-1.952-7.071,0L66.193,94.601l-10.12-10.12l8.775-8.775c1.953-1.953,1.953-5.119,0-7.071c-1.952-1.952-5.117-1.952-7.071,0l-8.775,8.775l-10.12-10.12l14.204-14.204c1.953-1.953,1.953-5.119,0-7.071c-1.953-1.952-5.118-1.952-7.071,0L31.811,60.218L18.107,46.514l28.408-28.408l151.693,151.693L169.799,198.207z" />
    </SvgIcon>
  );
});

IconLearnRuler.displayName = 'IconLearnRuler';

export {IconLearnRuler};
