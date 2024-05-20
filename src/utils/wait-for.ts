export async function waitFor(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay))
}
