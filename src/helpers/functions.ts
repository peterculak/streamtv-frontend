function isScalar(mixedVar: any) {
  return (/boolean|number|string/).test(typeof mixedVar);
}

export {isScalar};
