export function TermsContent() {
  return (
    <div className="space-y-4 text-sm">
      {/* Send by Email */}
      <p className="cursor-pointer text-center text-blue-500 underline">
        Send by Email
      </p>

      <hr />

      {/* Important notice */}
      <div>
        <p className="text-xs font-bold uppercase">Important</p>
        <p className="mt-1 text-muted-foreground">
          Please read the following terms. By proceeding with this sign up
          process, you are agreeing to be bound by the Teleo Terms and
          Conditions.
        </p>
      </div>

      <hr />

      {/* Section heading */}
      <h2 className="text-lg font-bold text-blue-500">
        A. Teleo Terms and Conditions
      </h2>

      <hr />

      {/* Intro */}
      <p>
        Welcome to Teleo! These Terms and Conditions govern your use of our
        application and services. By accessing or using our services, you agree
        to be bound by these terms.
      </p>

      {/* Bullet group 1 — Use */}
      <ul className="list-disc space-y-1 pl-5">
        <li>You must be at least 12 years old to use our services.</li>
        <li>
          You agree not to misuse our services or use them for any illegal or
          unauthorized purposes.
        </li>
        <li>
          We reserve the right to suspend or terminate access to our services
          for any violation of these terms.
        </li>
      </ul>

      {/* Bullet group 2 — IP */}
      <ul className="list-disc space-y-1 pl-5">
        <li>
          All content, trademarks, and intellectual property on our platform are
          owned by Teleo or licensed to us.
        </li>
        <li>
          You may not copy, distribute, or exploit any part of our content
          without our prior written permission.
        </li>
      </ul>

      {/* Bullet group 3 — Liability */}
      <ul className="list-disc space-y-1 pl-5">
        <li>
          We do not guarantee the accuracy, completeness, or reliability of our
          services.
        </li>
        <li>
          We are not liable for any direct, indirect, or incidental damages
          arising from your use of our services.
        </li>
      </ul>

      {/* Bullet group 4 — Privacy */}
      <ul className="list-disc space-y-1 pl-5">
        <li>
          Your use of our services is also governed by our Privacy Policy, which
          explains how we collect, use, and protect your data.
        </li>
      </ul>

      {/* Bullet group 5 — Changes */}
      <ul className="list-disc space-y-1 pl-5">
        <li>
          We reserve the right to update or modify these terms at any time.
          Changes will be effective upon posting on our website.
        </li>
        <li>
          Continued use of our services after any modifications constitutes
          acceptance of the new terms.
        </li>
      </ul>

      {/* Bullet group 6 — Governing law */}
      <ul className="list-disc space-y-1 pl-5">
        <li>These terms are governed by the laws of R.A. 8293.</li>
        <li>
          Any disputes arising under these terms will be subject to the
          exclusive jurisdiction of the courts in R.A. 7394.
        </li>
      </ul>

      {/* Contact */}
      <p>
        If you have any questions about these terms, please contact us at{" "}
        <span className="text-blue-500">teleo@gmail.com</span>.
      </p>

      {/* Closing */}
      <p>
        By using our services, you acknowledge that you have read, understood,
        and agreed to these Terms and Conditions.
      </p>
    </div>
  )
}
