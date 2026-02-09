export async function startMSW() {
  const { server } = await import('../mocks/server');
  server.listen();
}
