function Footer() {
  const date = new Date();
  return (
    <footer>
      <h4>Created By Sandy-{date.getFullYear()}</h4>
    </footer>
  );
}
export default Footer;
