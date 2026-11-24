// Web3Forms access keys are public by design: they ship in the browser bundle either way (the
// submission is sent from the visitor's browser). Setting NEXT_PUBLIC_WEB3FORMS_KEY at build time
// overrides this default. Same setup as the eaha project.
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "53236b80-5255-4407-bb80-9d7948df7a51";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Sends `fields` to Web3Forms (delivered by email). `ok` is false when the request or Web3Forms fails. */
export async function submitWeb3Form(fields: Record<string, string | boolean>) {
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...fields }),
    });
    const data: { success?: boolean; message?: string } | null = await res.json().catch(() => null);
    return { ok: res.ok && !!data?.success, status: res.status, message: data?.message };
  } catch (error) {
    return { ok: false, status: 0, message: error instanceof Error ? error.message : String(error) };
  }
}

/** Form fields as strings, plus the honeypot (`botcheck`, a hidden checkbox bots tick). */
export function formFields(form: HTMLFormElement) {
  const data = new FormData(form);
  const fields: Record<string, string | boolean> = {};
  data.forEach((value, key) => {
    if (typeof value === "string") fields[key] = value.trim();
  });
  fields.botcheck = data.has("botcheck");
  return fields;
}
