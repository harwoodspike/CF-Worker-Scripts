export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const domain = url.searchParams.get("domain");

    if (!domain) {
      return Response.json({ error: "Missing domain parameter" }, { status: 400 });
    }

    const secret = request.headers.get("x-api-key");
    if (secret !== env.API_KEY) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
      const res = await fetch(`https://rdap.verisign.com/com/v1/domain/${domain}`);

      if (res.status === 404) {
        return Response.json({
          status: "available",
          registered: false,
          domain_name: domain,
          expiration: null,
          alert: "1"
        });
      }

      const w = await res.json();

      const domainName = w.ldhName || domain;

      let status = "unknown";
      if (w.status && w.status.length > 0) {
        status = w.status[0];
      }

      let expiration = null;
      if (w.events) {
        const expEvent = w.events.find(e => e.eventAction === "expiration");
        if (expEvent) expiration = new Date(expEvent.eventDate).toISOString();
      }

      const isRegistered = true;
      const alertCondition = !isRegistered || status !== "redemptionPeriod";

      return Response.json({
        status,
        registered: true,
        domain_name: domainName,
        expiration,
        alert: alertCondition ? "1" : "0"
      });

    } catch (e) {
      return Response.json({ error: e.message }, { status: 502 });
    }
  }
};
