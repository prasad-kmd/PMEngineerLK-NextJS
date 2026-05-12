import { getSettings } from "@/app/invoice-gen/actions/settings";
import { SettingsForm } from "@/components/invoice-gen/settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-6xl mx-auto">
      <SettingsForm initialData={settings} />
    </div>
  );
}
