defmodule Agbic.GameRoom do
  @behaviour Matchmaker.Room
  use GenServer

  # TODO: convert to agent? (only if we can crash the channels...)
  # could do if we actually track the room_pid to room_id in matchmaker,
  # then get channel_pids, but this seems crazy...

  def start_link(room_id) do
    GenServer.start_link(__MODULE__, {:ok, room_id}, [])
  end

  def join(server, _channel_pid, socket) do
    GenServer.call(server, {:join, socket})
  end

  def leave(server, pid) do
    # TODO:
  end

  def close(server) do
    GenServer.stop(server, :normal)
  end

  # ---

  def init({:ok, room_id}) do
    Process.flag(:trap_exit, true) # trap exits of joiners, but crash join channels if room goes down
    {:ok, %{:room_id => room_id, :players => %{}}}
  end

  def handle_call({:join, socket}, _from, state) do
    Process.link(socket.channel_pid) # trap exits of joiners, but crash join channels if room goes down
    {pos, st} = assign_player(state, socket, 0)
    {:reply, {:ok, :joined, pos}, st}
  end

  def handle_info(_msg, state) do
    {:noreply, state}
  end

  # ---

  defp assign_player(state, socket, pos) do
    case Map.has_key?(state.players, pos) do
      false -> {pos, %{state | players: Map.put(state.players, pos, socket)}}
      true -> assign_player(state, socket, pos + 1)
    end
  end
end