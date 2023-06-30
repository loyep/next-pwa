import { convertBoolean } from "../utils.js";

const resolveContextEnv = <T>(
  env: string | undefined,
  transform?: (_: string) => T
) => {
  if (env) {
    return transform?.(env);
  }
  return undefined;
};

export const NextPWAContext = {
  shouldMinify: resolveContextEnv(process.env.NEXT_PWA_MINIFY, convertBoolean),
  useSwcMinify: resolveContextEnv(
    process.env.NEXT_PWA_SWC_MINIFY,
    convertBoolean
  ),
};

/**
 * Set default values for `NextPWAContext`.
 * @param defaultValues The default values
 */
export const setDefaultContext = ({
  shouldMinify: _minify,
  useSwcMinify: _swcMinify,
}: Partial<typeof NextPWAContext>) => {
  NextPWAContext.shouldMinify === undefined &&
    (NextPWAContext.shouldMinify = _minify);

  NextPWAContext.useSwcMinify === undefined &&
    (NextPWAContext.useSwcMinify = _swcMinify);
};
