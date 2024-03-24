import { Page } from "@playwright/test";
import assert from "assert";
import chalk from "chalk";
import stripAnsi from "strip-ansi";

export async function debugPrint(
  page: Page | null,
  message: string,
  scope?: string
) {
  const formattedScope = scope ? `(${scope})` : "";
  console.log(message, formattedScope ? chalk.dim(formattedScope) : "");

  if (page !== null) {
    // Strip out all ANSI escape codes when we log this inside the browser.
    // Otherwise, the console messages in the recording are hard to read.
    const plainMessage = stripAnsi(message);
    await page.evaluate(
      ({ message, scope }) => {
        console.log(`${message} ${scope}`);
      },
      { message: plainMessage, scope: formattedScope }
    );
  }
}

export async function startTest({
  apiKey = process.env.TEST_USER_API_KEY,
  page,
  pathname,
}: {
  apiKey?: string;
  page: Page;
  pathname: string;
}) {
  const host = process.env.NEXT_PUBLIC_APP_URL;
  assert(host, "process.env.NEXT_PUBLIC_APP_URL is required");

  const url = `${host}${pathname}?e2e=1&apiKey=${apiKey}`;

  await debugPrint(page, `Navigating to ${chalk.bold(url)}`, "startTestView");
  await page.goto(url);
}