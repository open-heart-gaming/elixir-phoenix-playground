defmodule Playground.Presence do
  @moduledoc "Phoenix Presence"

  use Phoenix.Presence,
    otp_app: :playground,
    pubsub_server: Playground.PubSub

  def get_metas(topic) do
    Playground.Presence.list(topic)
    |> Map.values()
    |> Enum.map(&(&1.metas |> List.first()))
  end

  def get_meta(topic, key) do
    case Playground.Presence.get_by_key(topic, key) do
      [%{metas: [meta | _metas]} | _] -> meta
      %{metas: [meta | _metas]} -> meta
      [] -> nil
    end
  end
end
