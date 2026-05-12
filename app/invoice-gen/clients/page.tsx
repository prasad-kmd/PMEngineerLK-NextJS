import { getClients } from "@/app/invoice-gen/actions/clients";
// import { getSettings } from "@/app/invoice-gen/actions/settings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, User, Mail, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const clients = await getClients(q);
  // const settings = await getSettings();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <form>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search clients..."
              className="w-full h-12 pl-4 pr-4 rounded-2xl bg-card/20 backdrop-blur-md border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
            />
          </form>
        </div>
        <Button
          asChild
          className="rounded-2xl h-12 px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 font-bold"
        >
          <Link
            href="/invoice-gen/clients/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length > 0 ? (
          clients.map((client) => (
            <Card
              key={client.id}
              className="bg-card/20 backdrop-blur-md border-border/40 rounded-4xl overflow-hidden hover:border-primary/30 transition-all group"
            >
              <CardHeader className="p-6 pb-0">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <User className="h-6 w-6" />
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-xl opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0"
                  >
                    <Link href={`/invoice-gen/clients/${client.id}`}>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold google-sans tracking-tight group-hover:text-primary transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">
                    Client Profile
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {client.email && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span>{client.phone}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full rounded-xl font-bold border border-border/40 bg-background/40 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Link href={`/invoice-gen/clients/${client.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full border-dashed bg-transparent border-border/40">
            <CardContent className="p-12 text-center text-muted-foreground">
              No clients found.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
