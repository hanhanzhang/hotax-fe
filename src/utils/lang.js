export function validate_form(vueComponent, formName) {
  if (!formName) {
    formName = "ruleForm";
  }
  let result = false;
  vueComponent.$refs[formName].validate((valid) => {
    if (valid) result = true;
  });
  return result;
}
